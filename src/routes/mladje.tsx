import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent } from "@/lib/content/functions";
import type { MladjeContent } from "@/lib/content/types";

export const Route = createFileRoute("/mladje")({
  loader: () => getContent({ data: { key: "mladje" } }) as Promise<MladjeContent>,
  head: () => ({
    meta: [
      { title: "Млађе категорије — УЖКК Студент Ниш" },
      { name: "description", content: "Школа кошарке, тренери млађих категорија и упис у УЖКК Студент Ниш." },
    ],
  }),
  component: MladjePage,
});

function MladjePage() {
  const data = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} lead={data.lead} />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto grid max-w-7xl items-start gap-5 px-4 py-10 sm:gap-6 sm:px-6 sm:py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tighter sm:text-3xl">{data.enrollment.title}</h2>
            <p className="mt-2 text-sm">{data.enrollment.text}</p>
          </div>
          <a
            href={`mailto:${data.enrollment.ctaMailto}`}
            className="inline-block bg-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-background transition-all hover:bg-primary sm:px-7 sm:py-4 sm:text-xs"
          >
            {data.enrollment.ctaLabel}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tighter sm:mb-10 sm:text-3xl">Тренери</h2>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {data.coaches.map((s) => (
            <div key={s.id} className="bg-background p-5 outline outline-1 outline-border sm:p-6">
              <div className="flex gap-4 sm:gap-6">
                <img
                  src={s.img}
                  alt={s.name}
                  width={256}
                  height={320}
                  loading="lazy"
                  className="aspect-[3/4] w-24 flex-none object-cover sm:w-32"
                />
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{s.role}</span>
                  <h3 className="mt-1 text-lg font-extrabold tracking-tighter sm:text-xl">{s.name}</h3>
                  <p className="mt-3 text-sm text-pretty text-muted-foreground">{s.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tighter sm:mb-10 sm:text-3xl">Селекције</h2>
          <div className="grid gap-px bg-border md:grid-cols-2">
            {data.selections.map((sel) => (
              <div key={sel.id} className="bg-background p-5 sm:p-6">
                <img
                  src={sel.img}
                  alt={`Селекција ${sel.name}`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-extrabold tracking-tighter sm:text-xl">{sel.name}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{sel.age}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
