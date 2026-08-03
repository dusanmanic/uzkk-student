import type { SiteContent } from "@/lib/content/types";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="bg-primary pb-10 pt-14 text-primary-foreground sm:pb-12 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-widest text-primary-foreground/60">
            Партнери и спонзори
          </span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 opacity-70">
            {site.sponsors.map((s) => (
              <span key={s} className="text-sm font-black tracking-tighter">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-10 border-t border-primary-foreground/15 pt-10 sm:gap-12 sm:pt-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-2xl font-black tracking-tighter text-accent sm:text-3xl">{site.brand}</span>
            <p className="mt-5 max-w-[34ch] text-primary-foreground/70 sm:mt-6">{site.footerBlurb}</p>
          </div>
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest sm:mb-6">Контакт</h5>
            <p className="mb-2 text-sm">{site.email}</p>
            <p className="text-sm">{site.phone}</p>
          </div>
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest sm:mb-6">Пратите нас</h5>
            <div className="flex flex-col gap-2 text-sm">
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                Инстаграм
              </a>
              <a href={site.youtubeUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-primary-foreground/15 pt-6 sm:mt-12 sm:pt-8 md:flex-row">
          <span className="font-mono text-[10px] text-primary-foreground/50">
            © {new Date().getFullYear()} {site.brand} НИШ
          </span>
          <span className="font-mono text-[10px] text-primary-foreground/50">{site.addressShort}</span>
        </div>
      </div>
    </footer>
  );
}
