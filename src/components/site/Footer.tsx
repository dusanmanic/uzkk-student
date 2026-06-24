const sponsors = ["ГРАД НИШ", "НИШ-ЕКСПРЕС", "КСС", "СЦ ЧАИР", "ЈУГ МЕДИА"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-10 pt-14 sm:pb-12 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Sponsors */}
        <div className="mb-12 sm:mb-16">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Партнери и спонзори
          </span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 opacity-60">
            {sponsors.map((s) => (
              <span key={s} className="text-sm font-black tracking-tighter">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-12 border-t border-border pt-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-3xl font-black tracking-tighter text-primary">УЖКК СТУДЕНТ</span>
            <p className="mt-6 max-w-[34ch] text-muted-foreground">
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
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                Инстаграм
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-border pt-8 md:flex-row">
          <span className="font-mono text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} УЖКК СТУДЕНТ НИШ
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Обреновићева бб, ТПЦ Калча
          </span>
        </div>
      </div>
    </footer>
  );
}
