import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { players, staff } from "@/data/team";

export const Route = createFileRoute("/tim")({
  head: () => ({
    meta: [
      { title: "Тим — УЖКК Студент Ниш" },
      { name: "description", content: "Први тим и стручни штаб УЖКК Студент Ниш." },
    ],
  }),
  component: TimPage,
});

function TimPage() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <PageHeader eyebrow="Сезона 2025/26" title="ПРВИ ТИМ И СТРУЧНИ ШТАБ" lead="Упознајте играчице које бране боје Студента и стручни штаб иза њих." />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tighter sm:mb-10 sm:text-3xl">Играчице</h2>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {players.map((p) => (
            <div key={p.num} className="group bg-background p-6">
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
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-3xl font-extrabold tracking-tighter">Стручни штаб</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {staff.map((s) => (
              <div key={s.name} className="bg-background p-6">
                <div className="flex gap-6">
                  <img
                    src={s.img}
                    alt={s.name}
                    width={256}
                    height={320}
                    loading="lazy"
                    className="aspect-[3/4] w-32 flex-none object-cover"
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
