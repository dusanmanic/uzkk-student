import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, fileToBase64, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient, uploadMediaClient } from "@/lib/content/functions";
import type { GalerijaContent } from "@/lib/content/types";

export const Route = createFileRoute("/admin/galerija")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "galerija" } }) as Promise<GalerijaContent>,
  component: AdminGalerijaPage,
});

function newId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function AdminGalerijaPage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      setData(await saveContentClient("galerija", data));
      setMsg("Сачувано.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Галерија">
      <form onSubmit={onSave} className="space-y-6">
        <Field label="Eyebrow"><input className={inputClass} value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} /></Field>
        <Field label="Наслов"><input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Lead"><textarea className={textareaClass} rows={2} value={data.lead} onChange={(e) => setData({ ...data, lead: e.target.value })} /></Field>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Албуми</h2>
            <button type="button" className="border border-border px-3 py-2 text-[10px] font-bold uppercase" onClick={() => setData({
              ...data,
              albums: [...data.albums, { id: newId("alb"), title: "Нови албум", date: "", photos: [] }],
            })}>+ Албум</button>
          </div>
          {data.albums.map((album, ai) => (
            <div key={album.id} className="space-y-3 border border-border bg-background p-4">
              <div className="grid gap-2 md:grid-cols-2">
                <input className={inputClass} value={album.title} onChange={(e) => {
                  const albums = [...data.albums]; albums[ai] = { ...album, title: e.target.value }; setData({ ...data, albums });
                }} />
                <input className={inputClass} value={album.date} placeholder="Датум" onChange={(e) => {
                  const albums = [...data.albums]; albums[ai] = { ...album, date: e.target.value }; setData({ ...data, albums });
                }} />
              </div>
              <div className="flex flex-wrap gap-2">
                {album.photos.map((src, pi) => (
                  <div key={`${src}-${pi}`} className="relative">
                    <img src={src} alt="" className="h-20 w-20 object-cover" />
                    <button type="button" className="absolute right-0 top-0 bg-background/90 px-1 text-[10px]" onClick={() => {
                      const albums = [...data.albums];
                      albums[ai] = { ...album, photos: album.photos.filter((_, idx) => idx !== pi) };
                      setData({ ...data, albums });
                    }}>x</button>
                  </div>
                ))}
              </div>
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                const files = Array.from(e.target.files ?? []);
                const uploaded: string[] = [];
                for (const file of files) {
                  const enc = await fileToBase64(file);
                  const url = await uploadMediaClient({
                    path: `site-media/gallery/${album.id}-${Date.now()}-${uploaded.length}.jpg`,
                    contentBase64: enc.contentBase64,
                    contentType: enc.contentType,
                  });
                  uploaded.push(url);
                }
                const albums = [...data.albums];
                albums[ai] = { ...album, photos: [...album.photos, ...uploaded] };
                setData({ ...data, albums });
              }} />
              <button type="button" className="text-xs font-bold uppercase text-destructive" onClick={() => setData({ ...data, albums: data.albums.filter((_, idx) => idx !== ai) })}>
                Обриши албум
              </button>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">YouTube видеи</h2>
            <button type="button" className="border border-border px-3 py-2 text-[10px] font-bold uppercase" onClick={() => setData({
              ...data,
              videos: [...data.videos, { id: "", title: "" }],
            })}>+ Видео</button>
          </div>
          {data.videos.map((v, i) => (
            <div key={i} className="grid gap-2 border border-border bg-background p-3 md:grid-cols-[1fr_2fr_auto]">
              <input className={inputClass} placeholder="YouTube ID" value={v.id} onChange={(e) => {
                const videos = [...data.videos]; videos[i] = { ...v, id: e.target.value }; setData({ ...data, videos });
              }} />
              <input className={inputClass} placeholder="Наслов" value={v.title} onChange={(e) => {
                const videos = [...data.videos]; videos[i] = { ...v, title: e.target.value }; setData({ ...data, videos });
              }} />
              <button type="button" className="text-xs font-bold uppercase text-destructive" onClick={() => setData({ ...data, videos: data.videos.filter((_, idx) => idx !== i) })}>Обриши</button>
            </div>
          ))}
        </section>

        {msg ? <p className="text-sm">{msg}</p> : null}
        <button type="submit" disabled={saving} className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60">
          {saving ? "Чувам…" : "Сачувај"}
        </button>
      </form>
    </AdminShell>
  );
}
