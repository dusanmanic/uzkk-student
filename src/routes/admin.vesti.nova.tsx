import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsEditorForm } from "@/components/admin/NewsEditorForm";
import { ensureAdmin } from "@/lib/news/functions";

export const Route = createFileRoute("/admin/vesti/nova")({
  beforeLoad: () => ensureAdmin(),
  head: () => ({
    meta: [{ title: "Нова вест — Админ" }],
  }),
  component: AdminNewNewsPage,
});

function AdminNewNewsPage() {
  return (
    <AdminShell title="Нова вест">
      <NewsEditorForm mode="create" />
    </AdminShell>
  );
}
