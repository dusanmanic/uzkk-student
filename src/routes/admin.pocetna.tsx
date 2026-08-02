import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Field, fileToBase64, inputClass, textareaClass } from "@/components/admin/form-ui";
import { ensureAdmin } from "@/lib/news/functions";
import { getContent, saveContentClient, uploadMediaClient } from "@/lib/content/functions";
import type { HomepageContent } from "@/lib/content/types";

export const Route = createFileRoute("/admin/pocetna")({
  beforeLoad: () => ensureAdmin(),
  loader: () => getContent({ data: { key: "homepage" } }) as Promise<HomepageContent>,
  component: AdminHomePage,
});

function AdminHomePage() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onHeroImage(file: File | null) {
    if (!file) return;
    const encoded = await fileToBase64(file);
    const url = await uploadMediaClient({
      path: `site-media/site/hero-${Date.now()}.jpg`,
      contentBase64: encoded.contentBase64,
      contentType: encoded.contentType,
    });
    setData({ ...data, hero: { ...data.hero, heroImage: url } });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      setData(await saveContentClient("homepage", data));
      setMsg("Сачувано.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Грешка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="Почетна страница">
      <form onSubmit={onSave} className="space-y-6">
        <h2 className="text-lg font-bold">Hero</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Основан"><input className={inputClass} value={data.hero.foundedLabel} onChange={(e) => setData({ ...data, hero: { ...data.hero, foundedLabel: e.target.value } })} /></Field>
          <Field label="Бренд"><input className={inputClass} value={data.hero.brand} onChange={(e) => setData({ ...data, hero: { ...data.hero, brand: e.target.value } })} /></Field>
          <Field label="Наслов (пре)"><input className={inputClass} value={data.hero.headlineBefore} onChange={(e) => setData({ ...data, hero: { ...data.hero, headlineBefore: e.target.value } })} /></Field>
          <Field label="Наслов (акценат)"><input className={inputClass} value={data.hero.headlineAccent} onChange={(e) => setData({ ...data, hero: { ...data.hero, headlineAccent: e.target.value } })} /></Field>
          <Field label="Година badge"><input className={inputClass} value={data.hero.yearBadge} onChange={(e) => setData({ ...data, hero: { ...data.hero, yearBadge: e.target.value } })} /></Field>
          <Field label="Hero слика">
            <input type="file" accept="image/*" onChange={(e) => void onHeroImage(e.target.files?.[0] ?? null)} />
            <img src={data.hero.heroImage} alt="" className="mt-2 aspect-video max-w-xs object-cover" />
          </Field>
        </div>
        <Field label="Подтекст">
          <textarea className={textareaClass} rows={3} value={data.hero.subcopy} onChange={(e) => setData({ ...data, hero: { ...data.hero, subcopy: e.target.value } })} />
        </Field>

        <h2 className="text-lg font-bold">Историјат / школа / друштвене мреже</h2>
        <Field label="Историјат — наслов"><input className={inputClass} value={data.historyTeaser.title} onChange={(e) => setData({ ...data, historyTeaser: { ...data.historyTeaser, title: e.target.value } })} /></Field>
        <Field label="Историјат — текст"><textarea className={textareaClass} rows={4} value={data.historyTeaser.body} onChange={(e) => setData({ ...data, historyTeaser: { ...data.historyTeaser, body: e.target.value } })} /></Field>
        <Field label="Школа — наслов"><input className={inputClass} value={data.schoolCta.title} onChange={(e) => setData({ ...data, schoolCta: { ...data.schoolCta, title: e.target.value } })} /></Field>
        <Field label="Школа — текст"><textarea className={textareaClass} rows={3} value={data.schoolCta.body} onChange={(e) => setData({ ...data, schoolCta: { ...data.schoolCta, body: e.target.value } })} /></Field>
        <Field label="Социјални CTA наслов"><input className={inputClass} value={data.socialCtaTitle} onChange={(e) => setData({ ...data, socialCtaTitle: e.target.value })} /></Field>

        {msg ? <p className="text-sm">{msg}</p> : null}
        <button type="submit" disabled={saving} className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60">
          {saving ? "Чувам…" : "Сачувај"}
        </button>
      </form>
    </AdminShell>
  );
}
