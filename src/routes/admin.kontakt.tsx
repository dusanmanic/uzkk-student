import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient } from "@/lib/content/functions";
import type { KontaktPageContent } from "@/lib/content/types";

export const Route = createFileRoute("/admin/kontakt")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "kontakt" } }) as Promise<KontaktPageContent>,
  component: AdminKontaktPage,
});

function AdminKontaktPage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      setData(await saveContentClient("kontakt", data));
      setMsg("Сачувано. Адреса/телефон/email се уређују под „Сајт / футер”.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Контакт страница">
      <p className="mb-6 text-sm text-muted-foreground">
        Телефон, e-mail, адреса и друштвене мреже су заједнички — уредите их у секцији <strong>Сајт / футер</strong>.
      </p>
      <form onSubmit={onSave} className="space-y-5">
        <Field label="Eyebrow"><input className={inputClass} value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} /></Field>
        <Field label="Наслов"><input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
        <Field label="Лого кит — наслов"><input className={inputClass} value={data.logoKitTitle} onChange={(e) => setData({ ...data, logoKitTitle: e.target.value })} /></Field>
        <Field label="Лого кит — текст"><textarea className={textareaClass} rows={3} value={data.logoKitText} onChange={(e) => setData({ ...data, logoKitText: e.target.value })} /></Field>
        {msg ? <p className="text-sm">{msg}</p> : null}
        <button type="submit" disabled={saving} className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60">
          {saving ? "Чувам…" : "Сачувај"}
        </button>
      </form>
    </AdminShell>
  );
}
