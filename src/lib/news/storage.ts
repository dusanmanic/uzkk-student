import type { NewsIndexEntry, NewsItem, NewsWriteInput } from "./types";
import { bodyFromText, coverPublicPath, formatNewsDateTime } from "./types";

export type NewsStorage = {
  list(): Promise<NewsItem[]>;
  get(slug: string): Promise<NewsItem | null>;
  save(input: NewsWriteInput, previousSlug?: string): Promise<NewsItem>;
  remove(slug: string): Promise<void>;
};

export function toIndexEntry(item: NewsItem): NewsIndexEntry {
  return {
    slug: item.slug,
    date: item.date,
    publishedAt: item.publishedAt,
    title: item.title,
    excerpt: item.excerpt,
    img: item.img,
  };
}

export function buildNewsItem(
  input: NewsWriteInput,
  img: string,
): NewsItem {
  const publishedAt = input.publishedAt || new Date().toISOString();
  return {
    slug: input.slug,
    publishedAt,
    date: formatNewsDateTime(publishedAt),
    title: input.title.toLocaleUpperCase("sr-RS"),
    excerpt: input.excerpt,
    body: bodyFromText(input.bodyText),
    img,
  };
}

export function resolveCoverPath(
  slug: string,
  cover: NewsWriteInput["cover"],
  existingImg?: string,
  keepExisting?: boolean,
): string {
  if (cover?.contentBase64) {
    const ext = extensionFromFileName(cover.fileName) || extensionFromType(cover.contentType) || "jpg";
    return coverPublicPath(slug, `cover.${ext}`);
  }
  if (keepExisting && existingImg) return existingImg;
  return coverPublicPath(slug);
}

export function extensionFromFileName(fileName: string): string | null {
  const match = fileName.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? null;
}

export function extensionFromType(contentType: string): string | null {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  return null;
}

export function decodeBase64Payload(contentBase64: string): Buffer {
  const cleaned = contentBase64.includes(",")
    ? contentBase64.split(",", 2)[1]
    : contentBase64;
  return Buffer.from(cleaned, "base64");
}
