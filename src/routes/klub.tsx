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
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
        <div className="space-y-5 text-base text-pretty text-muted-foreground sm:space-y-6 sm:text-lg">
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

        <h2 className="mt-14 mb-6 text-2xl font-extrabold tracking-tighter sm:mt-20 sm:mb-8 sm:text-3xl">Кључни моменти</h2>
        <ol className="space-y-px bg-border">
          {milestones.map((m) => (
            <li key={m.year} className="grid gap-2 bg-background p-5 sm:gap-4 sm:p-6 md:grid-cols-[140px_1fr] md:items-baseline">
              <span className="font-mono text-xl font-extrabold text-primary sm:text-2xl">{m.year}</span>
              <p className="text-pretty">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
