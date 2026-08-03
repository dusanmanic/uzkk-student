import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient } from "@/lib/content/functions";
import type { SiteContent } from "@/lib/content/types";

export const Route = createFileRoute("/admin/sajt")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "site" } }) as Promise<SiteContent>,
  component: AdminSitePage,
});

function AdminSitePage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const saved = await saveContentClient("site", data);
      setData(saved);
      setMsg("Сачувано.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Сајт / футер / контакт подаци">
      <form onSubmit={onSave} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Бренд"><input className={inputClass} value={data.brand} onChange={(e) => setData({ ...data, brand: e.target.value })} /></Field>
          <Field label="Назив хале"><input className={inputClass} value={data.venueName} onChange={(e) => setData({ ...data, venueName: e.target.value })} /></Field>
          <Field label="Адреса"><input className={inputClass} value={data.addressLine} onChange={(e) => setData({ ...data, addressLine: e.target.value })} /></Field>
          <Field label="Кратка адреса (футер)"><input className={inputClass} value={data.addressShort} onChange={(e) => setData({ ...data, addressShort: e.target.value })} /></Field>
          <Field label="Телефон"><input className={inputClass} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></Field>
          <Field label="Телефон (tel: линк)"><input className={inputClass} value={data.phoneHref} onChange={(e) => setData({ ...data, phoneHref: e.target.value })} /></Field>
          <Field label="E-mail"><input className={inputClass} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></Field>
          <Field label="Maps query"><input className={inputClass} value={data.mapsEmbedQuery} onChange={(e) => setData({ ...data, mapsEmbedQuery: e.target.value })} /></Field>
          <Field label="Instagram URL"><input className={inputClass} value={data.instagramUrl} onChange={(e) => setData({ ...data, instagramUrl: e.target.value })} /></Field>
          <Field label="Facebook URL"><input className={inputClass} value={data.facebookUrl} onChange={(e) => setData({ ...data, facebookUrl: e.target.value })} /></Field>
          <Field label="Crest URL"><input className={inputClass} value={data.crestUrl} onChange={(e) => setData({ ...data, crestUrl: e.target.value })} /></Field>
        </div>
        <Field label="Футер текст">
          <textarea className={textareaClass} rows={3} value={data.footerBlurb} onChange={(e) => setData({ ...data, footerBlurb: e.target.value })} />
        </Field>
        <Field label="Спонзори (један по реду)">
          <textarea
            className={textareaClass}
            rows={5}
            value={data.sponsors.join("\n")}
            onChange={(e) =>
              setData({
                ...data,
                sponsors: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
              })
            }
          />
        </Field>
        {msg ? <p className="text-sm">{msg}</p> : null}
        <button type="submit" disabled={saving} className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60">
          {saving ? "Чувам…" : "Сачувај"}
        </button>
      </form>
    </AdminShell>
  );
}
