import type { ContentKey, ContentMap } from "./types";
import { decodeDataUrlOrBase64 } from "./fs";

export type R2Like = {
  get(key: string): Promise<{
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer>;
    httpMetadata?: { contentType?: string };
  } | null>;
  put(
    key: string,
    value: string | ArrayBuffer | Uint8Array,
    options?: { httpMetadata?: { contentType?: string } },
  ): Promise<unknown>;
  delete(key: string): Promise<unknown>;
  list?(options?: { prefix?: string; cursor?: string }): Promise<{
    objects: { key: string }[];
    truncated: boolean;
    cursor?: string;
  }>;
};

export function r2ContentKey(key: ContentKey) {
  return `content/${key}.json`;
}

export function mediaUrl(key: string): string {
  const clean = key.replace(/^\/+/, "");
  const publicBase = (typeof process !== "undefined" && process.env.R2_PUBLIC_BASE_URL) || "";
  if (publicBase) return `${publicBase.replace(/\/$/, "")}/${clean}`;
  return `/api/r2/${clean}`;
}

/** Rewrite /site-media and /vesti-media paths to /api/r2/... for browser use */
export function rewriteMediaUrls<T>(value: T): T {
  if (typeof value === "string") {
    if (
      value.startsWith("/site-media/") ||
      value.startsWith("/vesti-media/") ||
      value.startsWith("site-media/") ||
      value.startsWith("vesti-media/")
    ) {
      return mediaUrl(value) as T;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => rewriteMediaUrls(item)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = rewriteMediaUrls(v);
    }
    return out as T;
  }
  return value;
}

export function requireR2(r2: R2Like | null | undefined): R2Like {
  if (!r2) {
    throw new Error(
      "R2 nije dostupan. Za lokalni rad dodaj R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY u .env (R2 API token).",
    );
  }
  return r2;
}

export async function getContentDoc<K extends ContentKey>(
  key: K,
  opts: { r2: R2Like },
): Promise<ContentMap[K]> {
  const obj = await opts.r2.get(r2ContentKey(key));
  if (!obj) throw new Error(`Content not found in R2: ${key}`);
  const data = JSON.parse(await obj.text()) as ContentMap[K];
  return rewriteMediaUrls(data);
}

export async function putContentDoc<K extends ContentKey>(
  key: K,
  data: ContentMap[K],
  opts: { r2: R2Like },
): Promise<void> {
  await opts.r2.put(r2ContentKey(key), JSON.stringify(data, null, 2), {
    httpMetadata: { contentType: "application/json" },
  });
}

export async function putMediaFile(
  relativePath: string,
  contentBase64: string,
  contentType: string,
  opts: { r2: R2Like },
): Promise<string> {
  const bytes = decodeDataUrlOrBase64(contentBase64);
  const clean = relativePath.replace(/^\/+/, "");
  await opts.r2.put(clean, bytes, {
    httpMetadata: { contentType },
  });
  return mediaUrl(clean);
}

export async function deleteR2Prefix(r2: R2Like, prefix: string): Promise<void> {
  if (!r2.list) return;
  let cursor: string | undefined;
  do {
    const page = await r2.list({ prefix, cursor });
    await Promise.all(page.objects.map((o) => r2.delete(o.key)));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
}
