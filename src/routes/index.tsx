import { createFileRoute } from "@tanstack/react-router";
import heroPlayer from "@/assets/hero-player.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "УЖКК Студент Ниш — Женски кошаркашки клуб" },
      {
        name: "description",
        content:
          "Званични сајт Удружења женског кошаркашког клуба Студент Ниш. Вести, први тим, млађе селекције и распоред утакмица.",
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

const news = [
  {
    date: "22. АПРИЛ 2026.",
    title: "Нова титула за Звезду, Студент 30 минута равноправан противник",
    img: news1,
  },
  {
    date: "19. АПРИЛ 2026.",
    title: "Студент достојан финала, Звезда показала шампионску снагу",
    img: news2,
  },
  {
    date: "05. АПРИЛ 2026.",
    title: "Упис у школу кошарке за девојчице је отворен",
    img: news3,
  },
];

const players = [
  { num: "07", name: "Ана Митић", img: player1 },
  { num: "12", name: "Милица Јовић", img: player2 },
  { num: "24", name: "Сара Илић", img: player3 },
  { num: "10", name: "Јелена Петковић", img: player4 },
];

const sponsors = ["ГРАД НИШ", "НИШ-ЕКСПРЕС", "КСС", "СЦ ЧАИР", "ЈУГ МЕДИА"];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-primary">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <a href="#" className="text-xl font-extrabold tracking-tighter text-primary">
              УЖКК СТУДЕНТ
            </a>
            <div className="hidden gap-6 text-xs font-bold uppercase tracking-widest md:flex">
              <a href="#vesti" className="transition-colors hover:text-primary">
                Вести
              </a>
              <a href="#tim" className="transition-colors hover:text-primary">
                Тим
              </a>
              <a href="#klub" className="transition-colors hover:text-primary">
                Клуб
              </a>
              <a href="#kontakt" className="transition-colors hover:text-primary">
                Контакт
              </a>
            </div>
          </div>
          <span className="bg-accent px-2 py-1 font-mono text-[10px] font-bold text-accent-foreground">
            УЖИВО: 72 — 68
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-32">
          <div className="animate-reveal">
            <h1 className="mb-8 text-7xl font-extrabold leading-[0.85] tracking-tighter lg:text-9xl">
              ВИШЕ ОД <span className="text-primary">ИГРЕ.</span>
            </h1>
            <p className="mb-8 max-w-[40ch] text-lg text-pretty text-muted-foreground">
              Традиција, снага и заједништво. Женски кошаркашки клуб Студент Ниш — место где се
              стварају шампиони већ деценијама.
            </p>
            <a
              href="#vesti"
              className="inline-block cursor-pointer bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-foreground"
            >
              Следећа утакмица
            </a>
          </div>
          <div className="animate-reveal relative [animation-delay:200ms]">
            <img
              src={heroPlayer}
              alt="Кошаркашица Студента у акцији"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden bg-accent p-8 text-accent-foreground lg:block">
              <span className="font-mono text-4xl font-extrabold">1953</span>
              <p className="text-[10px] font-bold uppercase tracking-tighter">
                Година оснивања
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="vesti" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase text-primary">
              Активности
            </span>
            <h2 className="text-4xl font-extrabold tracking-tighter">НАЈНОВИЈЕ ВЕСТИ</h2>
          </div>
          <a
            href="#"
            className="border-b-2 border-accent pb-1 text-sm font-bold uppercase"
          >
            Архива
          </a>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-3">
          {news.map((n) => (
            <article key={n.title} className="group cursor-pointer bg-background p-8">
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
            </article>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="tim" className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="mb-6 text-6xl font-extrabold leading-none tracking-tighter">
                НАШ ТИМ
              </h2>
              <p className="mb-8 text-neutral-400">
                Упознајте првотимке које бране боје Студента ове сезоне.
              </p>
              <a
                href="#"
                className="inline-block border border-neutral-700 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-background hover:text-foreground"
              >
                Цео састав
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:col-span-8">
              {players.map((p) => (
                <div key={p.num} className="group">
                  <img
                    src={p.img}
                    alt={p.name}
                    width={512}
                    height={768}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                  <div className="mt-4">
                    <span className="font-mono text-lg font-bold text-accent">#{p.num}</span>
                    <h4 className="text-sm font-bold uppercase">{p.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section id="klub" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-3">
          <div>
            <span className="font-mono text-xs uppercase text-primary">О клубу</span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tighter">
              Седамдесет година у нишкој кошарци.
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground lg:col-span-2">
            <p className="text-lg text-pretty">
              УЖКК Студент Ниш је један од најстаријих женских кошаркашких клубова у Србији.
              Кроз нашу школу прошле су генерације врхунских играчица, а данас радимо са
              више од сто девојчица у свим узрасним категоријама.
            </p>
            <div className="grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <div className="font-mono text-4xl font-extrabold text-primary">70+</div>
                <p className="mt-1 text-xs uppercase tracking-widest">Година традиције</p>
              </div>
              <div>
                <div className="font-mono text-4xl font-extrabold text-primary">5</div>
                <p className="mt-1 text-xs uppercase tracking-widest">Селекција</p>
              </div>
              <div>
                <div className="font-mono text-4xl font-extrabold text-primary">100+</div>
                <p className="mt-1 text-xs uppercase tracking-widest">Играчица</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="border-b border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 opacity-50">
          {sponsors.map((s) => (
            <span key={s} className="text-sm font-black tracking-tighter">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="border-t border-border bg-background pb-12 pt-24">
        <div className="mx-auto mb-24 grid max-w-7xl gap-12 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-3xl font-black tracking-tighter text-primary">
              УЖКК СТУДЕНТ
            </span>
            <p className="mt-6 max-w-[30ch] text-muted-foreground">
              Ниш, Србија. Спортски центар Чаир. Постаните део наше породице.
            </p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest">Контакт</h5>
            <p className="mb-2 text-sm">info@uzkkstudent.rs</p>
            <p className="text-sm">+381 64 / 2-4444-87</p>
          </div>
          <div>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest">Пратите нас</h5>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="transition-colors hover:text-primary">
                Инстаграм
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Фејсбук
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl justify-between border-t border-border px-6 pt-8">
          <span className="font-mono text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} УЖКК СТУДЕНТ НИШ
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Обреновићева бб, ТПЦ Калча
          </span>
        </div>
      </footer>
    </div>
  );
}
