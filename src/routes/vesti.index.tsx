import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { listNews } from "@/lib/news/functions";

export const Route = createFileRoute("/vesti/")({
  loader: () => listNews(),
  head: () => ({
    meta: [
      { title: "Вести — УЖКК Студент Ниш" },
      { name: "description", content: "Све најновије вести из УЖКК Студент Ниш." },
    ],
  }),
  component: VestiPage,
});

function VestiPage() {
  const news = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow="Активности" title="ВЕСТИ" lead="Све што се дешава у клубу — резултати, упис, дешавања." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.slug}
              to="/vesti/$slug"
              params={{ slug: n.slug }}
              className="group bg-background p-5 sm:p-8"
            >
              <img
                src={n.img}
                alt={n.title}
                width={1024}
                height={640}
                loading="lazy"
                className="mb-5 aspect-video w-full object-cover sm:mb-6"
              />
              <span className="font-mono text-[10px] text-muted-foreground">{n.date}</span>
              <h3 className="mt-2 text-xl font-bold uppercase italic tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                {n.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{n.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
