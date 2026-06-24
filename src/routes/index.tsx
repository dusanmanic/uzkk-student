import { createFileRoute, Link } from "@tanstack/react-router";
import heroPlayer from "@/assets/hero-player.jpg";
import crest from "@/assets/crest.png";
import { news } from "@/data/news";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "УЖКК Студент Ниш — Више од игре" },
      {
        name: "description",
        content:
          "Званични сајт Удружења женског кошаркашког клуба Студент Ниш. Вести, тим, млађе селекције и контакт.",
      },
      { property: "og:title", content: "УЖКК Студент Ниш" },
      {
        property: "og:description",
        content: "Традиција нишке женске кошарке — клуб, тим, вести и распоред.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const latest = news.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-28">
          <div className="animate-reveal">
            <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <img src={crest} alt="Грб УЖКК Студент Ниш" width={72} height={72} className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Од 1953.
                </span>
                <h2 className="truncate text-sm font-extrabold tracking-tighter text-primary sm:text-base">
                  УЖКК СТУДЕНТ НИШ
                </h2>
              </div>
            </div>
            <h1 className="mb-6 text-[2.75rem] font-extrabold leading-[0.85] tracking-tighter sm:mb-8 sm:text-6xl lg:text-8xl">
              ВИШЕ ОД <span className="text-primary">ИГРЕ.</span>
            </h1>
            <p className="mb-6 max-w-[42ch] text-base text-pretty text-muted-foreground sm:mb-8 sm:text-lg">
              Традиција, снага и заједништво. Женски кошаркашки клуб Студент Ниш — место где се
              стварају шампиони већ деценијама.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/vesti"
                className="inline-block bg-primary px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-foreground sm:px-7 sm:py-4 sm:text-xs"
              >
                Најновије вести
              </Link>
              <Link
                to="/mladje"
                className="inline-block border border-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background sm:px-7 sm:py-4 sm:text-xs"
              >
                Школа кошарке
              </Link>
            </div>
          </div>
          <div className="animate-reveal relative [animation-delay:200ms]">
            <img
              src={heroPlayer}
              alt="Кошаркашица Студента у акцији"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden bg-accent p-6 text-accent-foreground lg:block">
              <span className="font-mono text-4xl font-extrabold">1953</span>
              <p className="text-[10px] font-bold uppercase tracking-tighter">Година оснивања</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <span className="mb-5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:mb-6">
            Такмичимо се у
          </span>
          <div className="flex flex-wrap items-center gap-6 sm:gap-12">
            <a
              href="https://www.kss.rs/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-opacity hover:opacity-100 opacity-80"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-extrabold sm:h-14 sm:w-14">
                КСС
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">Кошаркашки савез Србије</p>
                <p className="text-xs text-muted-foreground group-hover:text-primary">kss.rs ↗</p>
              </div>
            </a>
            <a
              href="https://www.fiba.basketball/eurocupwomen"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-opacity hover:opacity-100 opacity-80"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-extrabold text-xs sm:h-14 sm:w-14">
                FIBA
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">FIBA EuroCup Women</p>
                <p className="text-xs text-muted-foreground group-hover:text-primary">fiba.basketball ↗</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div className="min-w-0">
            <span className="mb-2 block font-mono text-xs uppercase text-primary">Активности</span>
            <h2 className="text-2xl font-extrabold tracking-tighter sm:text-4xl">НАЈНОВИЈЕ ВЕСТИ</h2>
          </div>
          <Link to="/vesti" className="shrink-0 border-b-2 border-accent pb-1 text-xs font-bold uppercase sm:text-sm">
            Све вести
          </Link>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {latest.map((n) => (
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
              <h3 className="mt-2 text-xl font-bold italic tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                {n.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* History strip */}
      <section className="border-y border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-3">
          <div>
            <span className="font-mono text-xs uppercase text-accent">Историјат</span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tighter">
              Седамдесет година нишке кошарке.
            </h2>
          </div>
          <div className="space-y-6 text-neutral-300 lg:col-span-2">
            <p className="text-lg text-pretty">
              УЖКК Студент Ниш је један од најстаријих женских кошаркашких клубова у Србији.
              Основан 1953. године, кроз нашу школу прошле су генерације врхунских играчица.
              Данас радимо са више од сто девојчица у свим узрасним категоријама.
            </p>
            <Link
              to="/klub"
              className="inline-block border border-neutral-700 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-background hover:text-foreground"
            >
              Цео историјат →
            </Link>
          </div>
        </div>
      </section>

      {/* School CTA */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-20 md:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase text-primary">Упис је отворен</span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tighter lg:text-5xl">
              Школа кошарке за девојчице 7–14 година.
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Тренинзи у Спортском центру Чаир, под стручним вођством наших тренера млађих
              категорија. Постаните део наше породице.
            </p>
            <Link
              to="/mladje"
              className="inline-block bg-accent px-7 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-all hover:bg-foreground hover:text-background"
            >
              Информације о упису →
            </Link>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <span className="text-2xl font-extrabold tracking-tighter">Пратите нас уживо</span>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background"
            >
              Инстаграм ↗
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background"
            >
              YouTube ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
