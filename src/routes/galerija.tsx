import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import hero from "@/assets/hero-player.jpg";
import youthGroup from "@/assets/youth-group.jpg";
import p1 from "@/assets/player-1.jpg";
import p2 from "@/assets/player-2.jpg";
import p3 from "@/assets/player-3.jpg";

export const Route = createFileRoute("/galerija")({
  head: () => ({
    meta: [
      { title: "Галерија — УЖКК Студент Ниш" },
      { name: "description", content: "Фотографије и видео снимци УЖКК Студент Ниш." },
    ],
  }),
  component: GalerijaPage,
});

const albums = [
  { title: "Сезона 2025/26", date: "Април 2026.", photos: [news1, hero, news2, p1, p2, news3] },
  { title: "Школа кошарке", date: "Март 2026.", photos: [youthGroup, news3, p3, news2] },
];

const videos = [
  { id: "dQw4w9WgXcQ", title: "Студент — најбољи моменти сезоне" },
  { id: "M7lc1UVf-VE", title: "Тренинг младих селекција" },
];

function GalerijaPage() {
  return (
    <>
      <PageHeader eyebrow="Галерија" title="ФОТОГРАФИЈЕ И ВИДЕО." lead="Албуми са утакмица и тренинга, плус видео снимци са нашег YouTube канала." />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {albums.map((album) => (
          <div key={album.title} className="mb-16">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold tracking-tighter">{album.title}</h2>
              <span className="font-mono text-xs text-muted-foreground">{album.date}</span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-4">
              {album.photos.map((src, i) => (
                <div key={i} className="bg-background">
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
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tighter">Видео — YouTube</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {videos.map((v) => (
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
