import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, fileToBase64, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient, uploadMediaClient } from "@/lib/content/functions";
import type { MladjeContent, StaffMember } from "@/lib/content/types";

export const Route = createFileRoute("/admin/mladje")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "mladje" } }) as Promise<MladjeContent>,
  component: AdminMladjePage,
});

function newId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function AdminMladjePage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      setData(await saveContentClient("mladje", data));
      setMsg("Сачувано.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Млађе категорије">
      <form onSubmit={onSave} className="space-y-6">
        <Field label="Eyebrow"><input className={inputClass} value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} /></Field>
        <Field label="Наслов"><input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Lead"><textarea className={textareaClass} rows={3} value={data.lead} onChange={(e) => setData({ ...data, lead: e.target.value })} /></Field>
        <Field label="Упис — наслов"><input className={inputClass} value={data.enrollment.title} onChange={(e) => setData({ ...data, enrollment: { ...data.enrollment, title: e.target.value } })} /></Field>
        <Field label="Упис — текст"><textarea className={textareaClass} rows={2} value={data.enrollment.text} onChange={(e) => setData({ ...data, enrollment: { ...data.enrollment, text: e.target.value } })} /></Field>
        <Field label="CTA mailto"><input className={inputClass} value={data.enrollment.ctaMailto} onChange={(e) => setData({ ...data, enrollment: { ...data.enrollment, ctaMailto: e.target.value } })} /></Field>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Тренери</h2>
            <button type="button" className="border border-border px-3 py-2 text-[10px] font-bold uppercase" onClick={() => {
              const blank: StaffMember = { id: newId("yc"), name: "", role: "", bio: "", img: "/site-media/coaches/01.jpg" };
              setData({ ...data, coaches: [...data.coaches, blank] });
            }}>+ Тренер</button>
          </div>
          {data.coaches.map((c, i) => (
            <div key={c.id} className="space-y-2 border border-border bg-background p-4">
              <div className="grid gap-2 md:grid-cols-2">
                <input className={inputClass} value={c.name} placeholder="Име" onChange={(e) => {
                  const coaches = [...data.coaches]; coaches[i] = { ...c, name: e.target.value }; setData({ ...data, coaches });
                }} />
                <input className={inputClass} value={c.role} placeholder="Улога" onChange={(e) => {
                  const coaches = [...data.coaches]; coaches[i] = { ...c, role: e.target.value }; setData({ ...data, coaches });
                }} />
              </div>
              <textarea className={textareaClass} rows={3} value={c.bio} onChange={(e) => {
                const coaches = [...data.coaches]; coaches[i] = { ...c, bio: e.target.value }; setData({ ...data, coaches });
              }} />
              <div className="flex flex-wrap items-center gap-3">
                <img src={c.img} alt="" className="h-16 w-12 object-cover" />
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const enc = await fileToBase64(file);
                  const url = await uploadMediaClient({ path: `site-media/coaches/${c.id}-${Date.now()}.jpg`, contentBase64: enc.contentBase64, contentType: enc.contentType });
                  const coaches = [...data.coaches]; coaches[i] = { ...c, img: url }; setData({ ...data, coaches });
                }} />
                <button type="button" className="text-xs font-bold uppercase text-destructive" onClick={() => setData({ ...data, coaches: data.coaches.filter((_, idx) => idx !== i) })}>Обриши</button>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Селекције</h2>
            <button type="button" className="border border-border px-3 py-2 text-[10px] font-bold uppercase" onClick={() => setData({
              ...data,
              selections: [...data.selections, { id: newId("sel"), name: "", age: "", img: "/site-media/site/crest.svg" }],
            })}>+ Селекција</button>
          </div>
          {data.selections.map((s, i) => (
            <div key={s.id} className="space-y-2 border border-border bg-background p-4">
              <div className="grid gap-2 md:grid-cols-2">
                <input className={inputClass} value={s.name} placeholder="Назив" onChange={(e) => {
                  const selections = [...data.selections]; selections[i] = { ...s, name: e.target.value }; setData({ ...data, selections });
                }} />
                <input className={inputClass} value={s.age} placeholder="Узраст" onChange={(e) => {
                  const selections = [...data.selections]; selections[i] = { ...s, age: e.target.value }; setData({ ...data, selections });
                }} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <img src={s.img} alt="" className="h-16 w-24 object-contain bg-muted/40" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const enc = await fileToBase64(file);
                    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
                    const url = await uploadMediaClient({
                      path: `site-media/selections/${s.id}-${Date.now()}.${ext}`,
                      contentBase64: enc.contentBase64,
                      contentType: enc.contentType,
                    });
                    const selections = [...data.selections];
                    selections[i] = { ...s, img: url };
                    setData({ ...data, selections });
                  }}
                />
                <button
                  type="button"
                  className="text-xs font-bold uppercase text-destructive"
                  onClick={() => setData({ ...data, selections: data.selections.filter((_, idx) => idx !== i) })}
                >
                  Обриши
                </button>
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
