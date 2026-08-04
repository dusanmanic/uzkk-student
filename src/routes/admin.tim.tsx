import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, fileToBase64, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient, uploadMediaClient } from "@/lib/content/functions";
import type { Player, StaffMember, TimContent } from "@/lib/content/types";

export const Route = createFileRoute("/admin/tim")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "tim" } }) as Promise<TimContent>,
  component: AdminTimPage,
});

function newId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function AdminTimPage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function uploadPlayerImg(i: number, file: File | null) {
    if (!file) return;
    const enc = await fileToBase64(file);
    const url = await uploadMediaClient({
      path: `site-media/players/${data.players[i]!.id}-${Date.now()}.jpg`,
      contentBase64: enc.contentBase64,
      contentType: enc.contentType,
    });
    const players = [...data.players];
    players[i] = { ...players[i]!, img: url };
    setData({ ...data, players });
  }

  async function uploadStaffImg(i: number, file: File | null) {
    if (!file) return;
    const enc = await fileToBase64(file);
    const url = await uploadMediaClient({
      path: `site-media/coaches/${data.staff[i]!.id}-${Date.now()}.jpg`,
      contentBase64: enc.contentBase64,
      contentType: enc.contentType,
    });
    const staff = [...data.staff];
    staff[i] = { ...staff[i]!, img: url };
    setData({ ...data, staff });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      setData(await saveContentClient("tim", data));
      setMsg("Сачувано.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Тим">
      <form onSubmit={onSave} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Сезона"><input className={inputClass} value={data.seasonLabel} onChange={(e) => setData({ ...data, seasonLabel: e.target.value })} /></Field>
          <Field label="Наслов"><input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
        </div>
        <Field label="Lead"><textarea className={textareaClass} rows={2} value={data.lead} onChange={(e) => setData({ ...data, lead: e.target.value })} /></Field>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Кошаркашице</h2>
            <button
              type="button"
              className="border border-border px-3 py-2 text-[10px] font-bold uppercase"
              onClick={() => {
                const blank: Player = {
                  id: newId("p"),
                  num: "",
                  name: "",
                  position: "",
                  height: "",
                  birthYear: new Date().getFullYear() - 18,
                  birthplace: "",
                  img: "/site-media/players/01.jpg",
                };
                setData({ ...data, players: [...data.players, blank] });
              }}
            >
              + Играчица
            </button>
          </div>
          {data.players.map((p, i) => (
            <div key={p.id} className="space-y-2 border border-border bg-background p-4">
              <div className="grid gap-2 md:grid-cols-3">
                <input className={inputClass} placeholder="Име" value={p.name} onChange={(e) => {
                  const players = [...data.players]; players[i] = { ...p, name: e.target.value }; setData({ ...data, players });
                }} />
                <input className={inputClass} placeholder="Број" value={p.num} onChange={(e) => {
                  const players = [...data.players]; players[i] = { ...p, num: e.target.value }; setData({ ...data, players });
                }} />
                <input className={inputClass} placeholder="Позиција" value={p.position} onChange={(e) => {
                  const players = [...data.players]; players[i] = { ...p, position: e.target.value }; setData({ ...data, players });
                }} />
                <input className={inputClass} placeholder="Висина" value={p.height} onChange={(e) => {
                  const players = [...data.players]; players[i] = { ...p, height: e.target.value }; setData({ ...data, players });
                }} />
                <input className={inputClass} type="number" placeholder="Година рођења" value={p.birthYear} onChange={(e) => {
                  const players = [...data.players]; players[i] = { ...p, birthYear: Number(e.target.value) || 0 }; setData({ ...data, players });
                }} />
                <input className={inputClass} placeholder="Место" value={p.birthplace} onChange={(e) => {
                  const players = [...data.players]; players[i] = { ...p, birthplace: e.target.value }; setData({ ...data, players });
                }} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <img src={p.img} alt="" className="h-16 w-12 object-cover" />
                <input type="file" accept="image/*" onChange={(e) => void uploadPlayerImg(i, e.target.files?.[0] ?? null)} />
                <button type="button" className="text-xs font-bold uppercase text-destructive" onClick={() => setData({ ...data, players: data.players.filter((_, idx) => idx !== i) })}>Обриши</button>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Стручни штаб</h2>
            <button
              type="button"
              className="border border-border px-3 py-2 text-[10px] font-bold uppercase"
              onClick={() => {
                const blank: StaffMember = { id: newId("s"), name: "", role: "", bio: "", img: "/site-media/coaches/01.jpg" };
                setData({ ...data, staff: [...data.staff, blank] });
              }}
            >
              + Члан штаба
            </button>
          </div>
          {data.staff.map((s, i) => (
            <div key={s.id} className="space-y-2 border border-border bg-background p-4">
              <div className="grid gap-2 md:grid-cols-2">
                <input className={inputClass} placeholder="Име" value={s.name} onChange={(e) => {
                  const staff = [...data.staff]; staff[i] = { ...s, name: e.target.value }; setData({ ...data, staff });
                }} />
                <input className={inputClass} placeholder="Улога" value={s.role} onChange={(e) => {
                  const staff = [...data.staff]; staff[i] = { ...s, role: e.target.value }; setData({ ...data, staff });
                }} />
              </div>
              <textarea className={textareaClass} rows={3} placeholder="Биографија" value={s.bio} onChange={(e) => {
                const staff = [...data.staff]; staff[i] = { ...s, bio: e.target.value }; setData({ ...data, staff });
              }} />
              <div className="flex flex-wrap items-center gap-3">
                <img src={s.img} alt="" className="h-16 w-12 object-cover" />
                <input type="file" accept="image/*" onChange={(e) => void uploadStaffImg(i, e.target.files?.[0] ?? null)} />
                <button type="button" className="text-xs font-bold uppercase text-destructive" onClick={() => setData({ ...data, staff: data.staff.filter((_, idx) => idx !== i) })}>Обриши</button>
              </div>
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
