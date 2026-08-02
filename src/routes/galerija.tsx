import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getContent } from "@/lib/content/functions";
import type { GalerijaContent } from "@/lib/content/types";

export const Route = createFileRoute("/galerija")({
  loader: () => getContent({ data: { key: "galerija" } }) as Promise<GalerijaContent>,
  head: () => ({
    meta: [
      { title: "Галерија — УЖКК Студент Ниш" },
      { name: "description", content: "Фотографије и видео снимци УЖКК Студент Ниш." },
    ],
  }),
  component: GalerijaPage,
});

function GalerijaPage() {
  const data = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} lead={data.lead} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {data.albums.map((album) => (
          <div key={album.id} className="mb-12 sm:mb-16">
            <div className="mb-5 flex items-baseline justify-between gap-3 sm:mb-6">
              <h2 className="text-xl font-extrabold tracking-tighter sm:text-2xl">{album.title}</h2>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{album.date}</span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-4">
              {album.photos.map((src, i) => (
                <div key={`${src}-${i}`} className="bg-background">
                  <img
                    src={src}
                    alt={`${album.title} — ${i + 1}`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-opacity hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="mb-6 text-xl font-extrabold tracking-tighter sm:mb-8 sm:text-2xl">Видео — YouTube</h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {data.videos.map((v) => (
              <div key={v.id}>
                <div className="aspect-video w-full overflow-hidden bg-foreground">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-3 text-sm font-bold">{v.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
