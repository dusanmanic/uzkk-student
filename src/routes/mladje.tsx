import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { youthCoaches } from "@/data/team";
import youthGroup from "@/assets/youth-group.jpg";

export const Route = createFileRoute("/mladje")({
  head: () => ({
    meta: [
      { title: "Млађе категорије — УЖКК Студент Ниш" },
      { name: "description", content: "Школа кошарке, тренери млађих категорија и упис у УЖКК Студент Ниш." },
    ],
  }),
  component: MladjePage,
});

const selections = [
  { name: "Пионирке", age: "9–13 година", img: youthGroup },
  { name: "Кадеткиње", age: "14–16 година", img: youthGroup },
];

function MladjePage() {
  return (
    <>
      <PageHeader
        eyebrow="Млађе категорије"
        title="ШКОЛА КОШАРКЕ ЗА ДЕВОЈЧИЦЕ."
        lead="Радимо са више од 100 девојчица у свим узрасним категоријама. Упис је отворен током целе године."
      />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter">Упис је отворен — 7–14 година.</h2>
            <p className="mt-2 text-sm">
              СЦ Чаир, Ниш. Пишите на info@uzkkstudent.rs или позовите +381 64 / 2-4444-87.
            </p>
          </div>
          <a
            href="mailto:info@uzkkstudent.rs"
            className="inline-block bg-foreground px-7 py-4 text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-primary"
          >
            Пријави се →
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-3xl font-extrabold tracking-tighter">Тренери</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {youthCoaches.map((s) => (
            <div key={s.role} className="bg-background p-6 outline outline-1 outline-border">
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
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-3xl font-extrabold tracking-tighter">Селекције</h2>
          <div className="grid gap-px bg-border md:grid-cols-2">
            {selections.map((sel) => (
              <div key={sel.name} className="bg-background p-6">
                <img
                  src={sel.img}
                  alt={`Селекција ${sel.name}`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="text-xl font-extrabold tracking-tighter">{sel.name}</h3>
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
