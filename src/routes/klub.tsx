import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/klub")({
  head: () => ({
    meta: [
      { title: "О клубу — УЖКК Студент Ниш" },
      { name: "description", content: "Историјат и постигнућа УЖКК Студент Ниш од 1953. године." },
    ],
  }),
  component: KlubPage,
});

const milestones = [
  { year: "1953", text: "Основан УЖКК Студент Ниш — један од најстаријих женских клубова у Србији." },
  { year: "1970-те", text: "Прве велике генерације играчица улазе у репрезентативне селекције." },
  { year: "1990-те", text: "Клуб постаје један од стубова женске кошарке на југу Србије." },
  { year: "2010-те", text: "Модернизација школе кошарке и систематски рад са млађим категоријама." },
  { year: "Данас", text: "Више од 100 девојчица тренира у клубу у свим узрасним категоријама." },
];

function KlubPage() {
  return (
    <>
      <PageHeader
        eyebrow="О клубу"
        title="СЕДАМДЕСЕТ ГОДИНА НИШКЕ КОШАРКЕ."
        lead="Од 1953. године градимо традицију женске кошарке у Нишу — кроз клуб су прошле генерације врхунских играчица."
      />
      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="space-y-6 text-lg text-pretty text-muted-foreground">
          <p>
            Удружење женског кошаркашког клуба Студент Ниш основано је 1953. године. Кроз
            деценије постојања, клуб је постао препознатљив по систематском раду са младим
            играчицама и константном присуству у такмичењима Кошаркашког савеза Србије.
          </p>
          <p>
            Наша мисија је да кроз кошарку обликујемо младе спортисткиње — не само као
            играчице, већ као особе које носе вредности тимског рада, дисциплине и заједништва.
          </p>
        </div>

        <h2 className="mt-20 mb-8 text-3xl font-extrabold tracking-tighter">Кључни моменти</h2>
        <ol className="space-y-px bg-border">
          {milestones.map((m) => (
            <li key={m.year} className="grid gap-4 bg-background p-6 md:grid-cols-[140px_1fr] md:items-baseline">
              <span className="font-mono text-2xl font-extrabold text-primary">{m.year}</span>
              <p className="text-pretty">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
