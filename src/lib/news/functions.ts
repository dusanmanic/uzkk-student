import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { z } from "zod";
import type { NewsItem } from "./types";
import { getR2 } from "@/lib/content/r2";

async function storage() {
  const { createR2NewsStorage } = await import("./r2-storage.server");
  return createR2NewsStorage(await getR2());
}

export const listNews = createServerFn({ method: "GET" }).handler(async () => {
  return (await storage()).list();
});

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    return (await storage()).get(data.slug);
  });

export const requireAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { isAdminAuthenticated } = await import("./auth.server");
  return { ok: await isAdminAuthenticated() };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { loginAdmin } = await import("./auth.server");
    const ok = await loginAdmin(data.password);
    if (!ok) {
      return { ok: false as const, error: "Pogrešna lozinka" };
    }
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutAdmin } = await import("./auth.server");
  logoutAdmin();
  return { ok: true as const };
});

export const ensureAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const { isAdminAuthenticated } = await import("./auth.server");
  if (!(await isAdminAuthenticated())) {
    throw redirect({ to: "/admin/login" });
  }
  return { ok: true as const };
});

const writeSchema = z.object({
  slug: z.string().min(1).max(80),
  date: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  bodyText: z.string().min(1),
  keepExistingCover: z.boolean().optional(),
  cover: z
    .object({
      fileName: z.string(),
      contentBase64: z.string(),
      contentType: z.string(),
    })
    .nullable()
    .optional(),
  previousSlug: z.string().optional(),
});

export async function saveNewsClient(
  data: z.infer<typeof writeSchema>,
): Promise<NewsItem> {
  return saveNews({ data });
}

export async function deleteNewsClient(slug: string): Promise<void> {
  await deleteNews({ data: { slug } });
}

export const saveNews = createServerFn({ method: "POST" })
  .validator(writeSchema)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./auth.server");
    await assertAdmin();
    const { previousSlug, ...input } = data;
    return (await storage()).save(input, previousSlug);
  });

export const deleteNews = createServerFn({ method: "POST" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./auth.server");
    await assertAdmin();
    await (await storage()).remove(data.slug);
    return { ok: true as const };
  });
