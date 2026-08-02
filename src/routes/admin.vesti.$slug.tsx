import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsEditorForm } from "@/components/admin/NewsEditorForm";
import { ensureAdmin, getNewsBySlug } from "@/lib/news/functions";

export const Route = createFileRoute("/admin/vesti/$slug")({
  beforeLoad: () => ensureAdmin(),
  loader: async ({ params }) => {
    const item = await getNewsBySlug({ data: { slug: params.slug } });
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `Измена · ${loaderData.title}` : "Измена вести" }],
  }),
  component: AdminEditNewsPage,
});

function AdminEditNewsPage() {
  const item = Route.useLoaderData();
  return (
    <AdminShell title="Измена вести">
      <NewsEditorForm mode="edit" initial={item} />
    </AdminShell>
  );
}
