import type { NewsIndexEntry, NewsItem } from "./types";
import {
  buildNewsItem,
  decodeBase64Payload,
  extensionFromFileName,
  extensionFromType,
  type NewsStorage,
} from "./storage";
import { coverPublicPath } from "./types";
import type { R2Like } from "@/lib/content/store";
import { deleteR2Prefix, mediaUrl, requireR2 } from "@/lib/content/store";

function indexKey() {
  return "content/vesti/index.json";
}

function vestKey(slug: string) {
  return `content/vesti/${slug}/vest.json`;
}

function mediaPrefix(slug: string) {
  return `vesti-media/${slug}/`;
}

function toApiImg(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http") || pathOrUrl.startsWith("/api/r2/")) return pathOrUrl;
  return mediaUrl(pathOrUrl.replace(/^\/+/, ""));
}

function storageKeyFromImg(img: string): string {
  return img.replace(/^\/api\/r2\//, "").replace(/^\/+/, "");
}

async function readJson<T>(r2: R2Like, key: string): Promise<T | null> {
  const obj = await r2.get(key);
  if (!obj) return null;
  return JSON.parse(await obj.text()) as T;
}

async function writeJson(r2: R2Like, key: string, data: unknown) {
  await r2.put(key, JSON.stringify(data, null, 2), {
    httpMetadata: { contentType: "application/json" },
  });
}

export function createR2NewsStorage(r2Input: R2Like | null): NewsStorage {
  const r2 = requireR2(r2Input);

  return {
    async list() {
      const index = (await readJson<NewsIndexEntry[]>(r2, indexKey())) ?? [];
      const items = await Promise.all(index.map((entry) => readJson<NewsItem>(r2, vestKey(entry.slug))));
      return items
        .filter((item): item is NewsItem => Boolean(item))
        .map((item) => ({ ...item, img: toApiImg(item.img) }));
    },

    async get(slug) {
      const item = await readJson<NewsItem>(r2, vestKey(slug));
      if (!item) return null;
      return { ...item, img: toApiImg(item.img) };
    },

    async save(input, previousSlug) {
      const existingSlug = previousSlug && previousSlug !== input.slug ? previousSlug : input.slug;
      const existing = await readJson<NewsItem>(r2, vestKey(existingSlug));

      let imgPath = existing
        ? storageKeyFromImg(existing.img)
        : coverPublicPath(input.slug).replace(/^\/+/, "");

      if (input.cover?.contentBase64) {
        const ext =
          extensionFromFileName(input.cover.fileName) ||
          extensionFromType(input.cover.contentType) ||
          "jpg";
        imgPath = `vesti-media/${input.slug}/cover.${ext}`;
        const bytes = decodeBase64Payload(input.cover.contentBase64);

        // Remove previous covers for this slug, then write the new one
        await deleteR2Prefix(r2, mediaPrefix(input.slug));
        for (const e of ["jpg", "jpeg", "png", "webp"]) {
          await r2.delete(`vesti-media/${input.slug}/cover.${e}`).catch(() => undefined);
        }

        await r2.put(imgPath, bytes, {
          httpMetadata: { contentType: input.cover.contentType || "image/jpeg" },
        });
      } else if (previousSlug && previousSlug !== input.slug && existing?.img) {
        const oldKey = storageKeyFromImg(existing.img);
        const oldObj = await r2.get(oldKey);
        if (oldObj) {
          const buf = new Uint8Array(await oldObj.arrayBuffer());
          const fileName = oldKey.split("/").pop() || "cover.jpg";
          imgPath = `vesti-media/${input.slug}/${fileName}`;
          await r2.put(imgPath, buf, {
            httpMetadata: { contentType: oldObj.httpMetadata?.contentType || "image/jpeg" },
          });
          await deleteR2Prefix(r2, mediaPrefix(previousSlug));
          for (const e of ["jpg", "jpeg", "png", "webp"]) {
            await r2.delete(`vesti-media/${previousSlug}/cover.${e}`).catch(() => undefined);
          }
        }
      }

      const stored: NewsItem = {
        ...buildNewsItem(input, `/${imgPath}`),
        img: `/${imgPath}`,
      };
      await writeJson(r2, vestKey(input.slug), stored);

      if (previousSlug && previousSlug !== input.slug) {
        await r2.delete(vestKey(previousSlug));
      }

      const index = (await readJson<NewsIndexEntry[]>(r2, indexKey())) ?? [];
      const next = index.filter(
        (entry) => entry.slug !== input.slug && entry.slug !== previousSlug,
      );
      next.unshift({
        slug: stored.slug,
        date: stored.date,
        title: stored.title,
        excerpt: stored.excerpt,
        img: stored.img,
      });
      await writeJson(r2, indexKey(), next);

      return { ...stored, img: toApiImg(stored.img) };
    },

    async remove(slug) {
      // JSON + any files under content/vesti/{slug}/
      await deleteR2Prefix(r2, `content/vesti/${slug}/`);
      await r2.delete(vestKey(slug)).catch(() => undefined);

      // Cover and any other media for this vest
      await deleteR2Prefix(r2, mediaPrefix(slug));
      for (const ext of ["jpg", "jpeg", "png", "webp", "gif"]) {
        await r2.delete(`vesti-media/${slug}/cover.${ext}`).catch(() => undefined);
      }

      const index = (await readJson<NewsIndexEntry[]>(r2, indexKey())) ?? [];
      await writeJson(
        r2,
        indexKey(),
        index.filter((entry) => entry.slug !== slug),
      );
    },
  };
}
