import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent } from "@/lib/content/functions";
import type { TimContent } from "@/lib/content/types";

export const Route = createFileRoute("/tim")({
  loader: () => getContent({ data: { key: "tim" } }) as Promise<TimContent>,
  head: () => ({
    meta: [
      { title: "Тим — УЖКК Студент Ниш" },
      { name: "description", content: "Први тим и стручни штаб УЖКК Студент Ниш." },
    ],
  }),
  component: TimPage,
});

function TimPage() {
  const data = Route.useLoaderData();
  const currentYear = new Date().getFullYear();
  return (
    <>
      <PageHeader eyebrow={data.seasonLabel} title={data.title} lead={data.lead} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tighter sm:mb-10 sm:text-3xl">Играчице</h2>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {data.players.map((p) => (
            <div key={p.id} className="group bg-background p-6">
              <img
                src={p.img}
                alt={p.name}
                width={512}
                height={768}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="text-lg font-bold uppercase tracking-tight">{p.name}</h3>
                <span className="font-mono text-2xl font-extrabold text-accent">#{p.num}</span>
              </div>
              <p className="mt-1 text-sm font-bold text-primary">{p.position}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-[11px] uppercase tracking-widest text-muted-foreground">
                <div>
                  <dt>Висина</dt>
                  <dd className="mt-1 font-mono text-sm font-bold text-foreground">{p.height}</dd>
                </div>
                <div>
                  <dt>Године</dt>
                  <dd className="mt-1 font-mono text-sm font-bold text-foreground">{currentYear - p.birthYear}</dd>
                </div>
                <div>
                  <dt>Рођена</dt>
                  <dd className="mt-1 font-mono text-sm font-bold text-foreground">{p.birthplace}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tighter sm:mb-10 sm:text-3xl">Стручни штаб</h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {data.staff.map((s) => (
              <div key={s.id} className="bg-background p-5 sm:p-6">
                <div className="flex gap-4 sm:gap-6">
                  <img
                    src={s.img}
                    alt={s.name}
                    width={256}
                    height={320}
                    loading="lazy"
                    className="aspect-[3/4] w-24 flex-none object-cover sm:w-32"
                  />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{s.role}</span>
                    <h3 className="mt-1 text-xl font-extrabold tracking-tighter">{s.name}</h3>
                    <p className="mt-3 text-sm text-pretty text-muted-foreground">{s.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
