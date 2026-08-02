import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient } from "@/lib/content/functions";
import type { KlubContent } from "@/lib/content/types";

export const Route = createFileRoute("/admin/klub")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "klub" } }) as Promise<KlubContent>,
  component: AdminKlubPage,
});

function AdminKlubPage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      setData(await saveContentClient("klub", data));
      setMsg("Сачувано.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="О клубу">
      <form onSubmit={onSave} className="space-y-5">
        <Field label="Eyebrow"><input className={inputClass} value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} /></Field>
        <Field label="Наслов"><input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Lead"><textarea className={textareaClass} rows={3} value={data.lead} onChange={(e) => setData({ ...data, lead: e.target.value })} /></Field>
        <Field label="Пасуси (празан ред = нови пасус)">
          <textarea
            className={textareaClass}
            rows={8}
            value={data.paragraphs.join("\n\n")}
            onChange={(e) =>
              setData({
                ...data,
                paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
              })
            }
          />
        </Field>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Милестони</h2>
            <button
              type="button"
              className="border border-border px-3 py-2 text-[10px] font-bold uppercase"
              onClick={() => setData({ ...data, milestones: [...data.milestones, { year: "", text: "" }] })}
            >
              + Додај
            </button>
          </div>
          {data.milestones.map((m, i) => (
            <div key={i} className="grid gap-2 border border-border bg-background p-3 md:grid-cols-[140px_1fr_auto]">
              <input className={inputClass} placeholder="Година" value={m.year} onChange={(e) => {
                const milestones = [...data.milestones];
                milestones[i] = { ...m, year: e.target.value };
                setData({ ...data, milestones });
              }} />
              <input className={inputClass} placeholder="Текст" value={m.text} onChange={(e) => {
                const milestones = [...data.milestones];
                milestones[i] = { ...m, text: e.target.value };
                setData({ ...data, milestones });
              }} />
              <button type="button" className="text-destructive text-xs font-bold uppercase" onClick={() => setData({ ...data, milestones: data.milestones.filter((_, idx) => idx !== i) })}>
                Обриши
              </button>
            </div>
          ))}
        </div>
        {msg ? <p className="text-sm">{msg}</p> : null}
        <button type="submit" disabled={saving} className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60">
          {saving ? "Чувам…" : "Сачувај"}
        </button>
      </form>
    </AdminShell>
  );
}
