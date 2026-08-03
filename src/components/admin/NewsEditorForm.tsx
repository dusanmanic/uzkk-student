import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  bodyToText,
  fromDatetimeLocalValue,
  nowIso,
  slugify,
  toDatetimeLocalValue,
  type NewsItem,
} from "@/lib/news/types";
import { saveNewsClient } from "@/lib/news/functions";

type Props = {
  mode: "create" | "edit";
  initial?: NewsItem | null;
};

async function fileToCover(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return {
    fileName: file.name,
    contentBase64: btoa(binary),
    contentType: file.type || "image/jpeg",
  };
}

export function NewsEditorForm({ mode, initial }: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const missingPublishedAt = mode === "edit" && !initial?.publishedAt;
  const [publishedLocal, setPublishedLocal] = useState(() =>
    toDatetimeLocalValue(initial?.publishedAt || nowIso()),
  );
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [bodyText, setBodyText] = useState(initial ? bodyToText(initial.body) : "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  const previewUrl = useMemo(() => {
    if (coverFile) return URL.createObjectURL(coverFile);
    return initial?.img ?? null;
  }, [coverFile, initial?.img]);

  useEffect(() => {
    return () => {
      if (coverFile && previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [coverFile, previewUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (mode === "create" && !coverFile) {
        throw new Error("Додајте насловну слику.");
      }
      const cover = coverFile ? await fileToCover(coverFile) : null;
      const item = await saveNewsClient({
          slug: slugify(slug || title),
          publishedAt: fromDatetimeLocalValue(publishedLocal),
          title: title.toLocaleUpperCase("sr-RS"),
          excerpt,
          bodyText,
          cover,
          keepExistingCover: true,
          previousSlug: mode === "edit" ? initial?.slug : undefined,
        });
      await navigate({ to: "/admin/vesti/$slug", params: { slug: item.slug } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Чување није успело.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Наслов</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value.toLocaleUpperCase("sr-RS"))}
            className="w-full border border-border bg-background px-3 py-3 text-base uppercase outline-none focus:border-primary"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Slug (URL) — попуњава се аутоматски из наслова
          </span>
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            onBlur={() => {
              if (!slug.trim()) {
                setSlugTouched(false);
                setSlug(slugify(title));
              }
            }}
            placeholder="npr. nova-titula-za-zvezdu"
            className="w-full border border-border bg-background px-3 py-3 font-mono text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Датум и време објаве
          </span>
          <input
            required
            type="datetime-local"
            value={publishedLocal}
            onChange={(e) => setPublishedLocal(e.target.value)}
            className="w-full border border-border bg-background px-3 py-3 text-base outline-none focus:border-primary"
          />
          {missingPublishedAt ? (
            <span className="block text-xs text-muted-foreground">
              Стара вест нема тачан датум/време — изаберите га овде, па сачувајте.
            </span>
          ) : null}
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Кратак опис</span>
          <textarea
            required
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border border-border bg-background px-3 py-3 text-base outline-none focus:border-primary"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Текст вести (пасуси одвојени празним редом)
          </span>
          <textarea
            required
            rows={10}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            className="w-full border border-border bg-background px-3 py-3 text-base leading-relaxed outline-none focus:border-primary"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Насловна слика {mode === "edit" ? "(опционо — остави празно да задржиш постојећу)" : ""}
          </span>
          <input
            type="file"
            accept="image/*"
            required={mode === "create"}
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm"
          />
          {previewUrl ? (
            <img src={previewUrl} alt="" className="mt-3 aspect-video max-w-md object-cover" />
          ) : null}
        </label>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Чувам…" : "Сачувај вест"}
        </button>
        <Link
          to="/admin"
          className="border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-muted"
        >
          Назад
        </Link>
        {mode === "edit" && initial ? (
          <Link
            to="/vesti/$slug"
            params={{ slug: initial.slug }}
            className="border border-border px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-muted"
          >
            Погледај на сајту
          </Link>
        ) : null}
      </div>
    </form>
  );
}
