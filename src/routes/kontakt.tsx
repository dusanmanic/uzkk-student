import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import crest from "@/assets/crest.png";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Контакт — УЖКК Студент Ниш" },
      { name: "description", content: "Контактирајте УЖКК Студент Ниш — адреса, телефон, e-mail и лого кит." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <>
      <PageHeader eyebrow="Контакт" title="ПИШИТЕ НАМ, ДОЂИТЕ НА ТРЕНИНГ." />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Адреса</span>
              <p className="mt-2 text-lg font-bold sm:text-xl">Спортски центар Чаир</p>
              <p className="text-muted-foreground">Обреновићева бб, ТПЦ Калча, 18000 Ниш, Србија</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Телефон</span>
              <p className="mt-2 text-lg font-bold sm:text-xl">
                <a href="tel:+381642444487" className="hover:text-primary">
                  +381 64 / 2-4444-87
                </a>
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">E-mail</span>
              <p className="mt-2 break-words text-lg font-bold sm:text-xl">
                <a href="mailto:info@uzkkstudent.rs" className="hover:text-primary">
                  info@uzkkstudent.rs
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background"
              >
                Инстаграм ↗
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background"
              >
                YouTube ↗
              </a>
            </div>
          </div>

          <div className="bg-muted/40 p-5 sm:p-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Лого кит</span>
            <h3 className="mt-2 text-xl font-extrabold tracking-tighter sm:text-2xl">Грб и визуелни идентитет</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              За медије и партнере. Кит садржи грб клуба у више формата.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
              <img src={crest} alt="Грб УЖКК Студент Ниш" width={120} height={120} className="h-20 w-20 sm:h-28 sm:w-28" />
              <a
                href={crest}
                download="uzkk-student-grb.png"
                className="inline-block bg-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-background transition-all hover:bg-primary sm:px-6 sm:text-xs"
              >
                Преузми грб (PNG) ↓
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <iframe
            title="Локација СЦ Чаир, Ниш"
            src="https://www.google.com/maps?q=Sportski+centar+Cair+Nis&output=embed"
            loading="lazy"
            className="aspect-[4/3] w-full border-0 grayscale sm:aspect-[16/7]"
          />
        </div>
      </section>
    </>
  );
}
