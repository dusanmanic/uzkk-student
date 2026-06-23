import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { news } from "@/data/news";

export const Route = createFileRoute("/vesti/")({
  head: () => ({
    meta: [
      { title: "Вести — УЖКК Студент Ниш" },
      { name: "description", content: "Све најновије вести из УЖКК Студент Ниш." },
    ],
  }),
  component: VestiPage,
});

function VestiPage() {
  return (
    <>
      <PageHeader eyebrow="Активности" title="ВЕСТИ" lead="Све што се дешава у клубу — резултати, упис, дешавања." />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-px bg-border md:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.slug}
              to="/vesti/$slug"
              params={{ slug: n.slug }}
              className="group bg-background p-8"
            >
              <img
                src={n.img}
                alt={n.title}
                width={1024}
                height={640}
                loading="lazy"
                className="mb-6 aspect-video w-full object-cover"
              />
              <span className="font-mono text-[10px] text-muted-foreground">{n.date}</span>
              <h3 className="mt-2 text-2xl font-bold italic tracking-tight transition-colors group-hover:text-primary">
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
