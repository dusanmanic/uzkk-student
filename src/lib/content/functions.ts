import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ContentKey, ContentMap } from "./types";
import { CONTENT_KEYS } from "./types";
import { getContentDoc, putContentDoc, putMediaFile, requireR2 } from "./store";
import { getR2 } from "./r2";

export const getContent = createServerFn({ method: "GET" })
  .validator((data: { key: ContentKey }) => data)
  .handler(async ({ data }) => {
    if (!CONTENT_KEYS.includes(data.key)) throw new Error("Invalid content key");
    const r2 = requireR2(await getR2());
    return getContentDoc(data.key, { r2 });
  });

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const r2 = requireR2(await getR2());
  return getContentDoc("site", { r2 });
});

export async function saveContentClient<K extends ContentKey>(
  key: K,
  data: ContentMap[K],
): Promise<ContentMap[K]> {
  await saveContent({ data: { key, data } });
  return data;
}

export async function uploadMediaClient(input: {
  path: string;
  contentBase64: string;
  contentType: string;
}): Promise<string> {
  const result = await uploadMedia({ data: input });
  return result.url;
}

export const saveContent = createServerFn({ method: "POST" })
  .validator(
    z.object({
      key: z.enum(["site", "homepage", "klub", "tim", "mladje", "galerija", "kontakt"]),
      data: z.unknown(),
    }),
  )
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("../news/auth.server");
    await assertAdmin();
    const r2 = requireR2(await getR2());
    await putContentDoc(data.key as ContentKey, data.data as ContentMap[ContentKey], { r2 });
    return data.data;
  });

export const uploadMedia = createServerFn({ method: "POST" })
  .validator(
    z.object({
      path: z.string().min(1),
      contentBase64: z.string().min(1),
      contentType: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("../news/auth.server");
    await assertAdmin();
    const r2 = requireR2(await getR2());
    const url = await putMediaFile(data.path, data.contentBase64, data.contentType, { r2 });
    return { url };
  });
