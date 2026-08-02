import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteNewsClient, ensureAdmin, listNews } from "@/lib/news/functions";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/")({
  beforeLoad: () => ensureAdmin(),
  loader: () => listNews(),
  head: () => ({
    meta: [{ title: "Админ · Вести — УЖКК Студент" }],
  }),
  component: AdminIndexPage,
});

function AdminIndexPage() {
  const news = Route.useLoaderData();
  const router = useRouter();
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function onDelete(slug: string, title: string) {
    if (!confirm(`Обрисати вест „${title}”?`)) return;
    setBusySlug(slug);
    try {
      await deleteNewsClient(slug);
      await router.invalidate();
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <AdminShell title="Вести">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Поља су иста као на сајту: наслов, датум, кратак опис, текст и насловна слика.
        </p>
        <Link
          to="/admin/vesti/nova"
          className="bg-accent px-4 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground"
        >
          + Нова вест
        </Link>
      </div>

      <div className="divide-y divide-border border border-border bg-background">
        {news.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Нема вести. Додајте прву.</p>
        ) : (
          news.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex min-w-0 items-start gap-4">
                <img
                  src={item.img}
                  alt=""
                  className="h-16 w-24 shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-muted-foreground">{item.date}</p>
                  <h2 className="truncate text-lg font-bold">{item.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                </div>
              </div>
              <div className="flex w-[275px] shrink-0 gap-2">
                <Link
                  to="/admin/vesti/$slug"
                  params={{ slug: item.slug }}
                  className="flex-1 border border-border px-2 py-2 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
                >
                  Измени
                </Link>
                <Link
                  to="/vesti/$slug"
                  params={{ slug: item.slug }}
                  className="flex-1 border border-border px-2 py-2 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-muted"
                >
                  Сајт
                </Link>
                <button
                  type="button"
                  disabled={busySlug === item.slug}
                  onClick={() => void onDelete(item.slug, item.title)}
                  className="flex-1 cursor-pointer border border-destructive px-2 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 disabled:opacity-50"
                >
                  Обриши
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
