import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContentKey, ContentMap } from "./types";
import { CONTENT_KEYS } from "./types";

const ROOT = process.cwd();
export const CONTENT_DIR = path.join(ROOT, "public", "content");
export const SITE_MEDIA_DIR = path.join(ROOT, "public", "site-media");

export function contentPublicPath(key: ContentKey) {
  return `/content/${key}.json`;
}

export function contentFsPath(key: ContentKey) {
  return path.join(CONTENT_DIR, `${key}.json`);
}

export async function readContentFs<K extends ContentKey>(key: K): Promise<ContentMap[K] | null> {
  try {
    const raw = await readFile(contentFsPath(key), "utf8");
    return JSON.parse(raw) as ContentMap[K];
  } catch {
    return null;
  }
}

export async function writeContentFs<K extends ContentKey>(key: K, data: ContentMap[K]) {
  await mkdir(CONTENT_DIR, { recursive: true });
  await writeFile(contentFsPath(key), JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function writeMediaFs(relativePath: string, bytes: Buffer) {
  const clean = relativePath.replace(/^\/+/, "").replace(/\.\./g, "");
  const full = path.join(ROOT, "public", clean);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, bytes);
  return `/${clean}`;
}

export function decodeDataUrlOrBase64(input: string): Buffer {
  const cleaned = input.includes(",") ? input.split(",", 2)[1]! : input;
  return Buffer.from(cleaned, "base64");
}

export async function ensureAllContentSeeded() {
  for (const key of CONTENT_KEYS) {
    const existing = await readContentFs(key);
    if (!existing) {
      throw new Error(`Missing seed content for ${key}.json`);
    }
  }
}
