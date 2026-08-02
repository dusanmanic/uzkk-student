import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent, getSiteContent } from "@/lib/content/functions";
import type { KontaktPageContent, SiteContent } from "@/lib/content/types";

export const Route = createFileRoute("/kontakt")({
  loader: async () => {
    const [page, site] = await Promise.all([
      getContent({ data: { key: "kontakt" } }) as Promise<KontaktPageContent>,
      getSiteContent() as Promise<SiteContent>,
    ]);
    return { page, site };
  },
  head: () => ({
    meta: [
      { title: "Контакт — УЖКК Студент Ниш" },
      { name: "description", content: "Контактирајте УЖКК Студент Ниш — адреса, телефон, e-mail и лого кит." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const { page, site } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Адреса</span>
              <p className="mt-2 text-lg font-bold sm:text-xl">{site.venueName}</p>
              <p className="text-muted-foreground">{site.addressLine}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Телефон</span>
              <p className="mt-2 text-lg font-bold sm:text-xl">
                <a href={site.phoneHref} className="hover:text-primary">
                  {site.phone}
                </a>
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">E-mail</span>
              <p className="mt-2 break-words text-lg font-bold sm:text-xl">
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 sm:pt-4">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background"
              >
                Инстаграм ↗
              </a>
              <a
                href={site.youtubeUrl}
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
            <h3 className="mt-2 text-xl font-extrabold tracking-tighter sm:text-2xl">{page.logoKitTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{page.logoKitText}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
              <img src={site.crestUrl} alt="Грб УЖКК Студент Ниш" width={120} height={120} className="h-20 w-20 sm:h-28 sm:w-28" />
              <a
                href={site.crestUrl}
                download="uzkk-student-grb.svg"
                className="inline-block bg-foreground px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-background transition-all hover:bg-primary sm:px-6 sm:text-xs"
              >
                Преузми грб (PNG) ↓
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <iframe
            title={`Локација ${site.venueName}`}
            src={`https://www.google.com/maps?q=${site.mapsEmbedQuery}&output=embed`}
            loading="lazy"
            className="aspect-[4/3] w-full border-0 grayscale sm:aspect-[16/7]"
          />
        </div>
      </section>
    </>
  );
}
