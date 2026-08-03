export type NewsItem = {
  slug: string;
  /** Display label, e.g. "2. АВГУСТ 2026. · 19:45" */
  date: string;
  /** ISO-8601 timestamp for sorting / filters (may be missing on legacy items) */
  publishedAt?: string;
  title: string;
  excerpt: string;
  body: string[];
  /** Public URL or path to cover image */
  img: string;
};

export type NewsIndexEntry = {
  slug: string;
  date: string;
  publishedAt?: string;
  title: string;
  excerpt: string;
  img: string;
};

export type NewsWriteInput = {
  slug: string;
  /** ISO-8601 from admin datetime picker */
  publishedAt: string;
  title: string;
  excerpt: string;
  /** Paragraphs — empty lines split the body */
  bodyText: string;
  /** Optional base64 cover (data URL or raw base64) + filename */
  cover?: {
    fileName: string;
    contentBase64: string;
    contentType: string;
  } | null;
  /** Keep existing cover when editing without new upload */
  keepExistingCover?: boolean;
};

export function bodyFromText(bodyText: string): string[] {
  return bodyText
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

export function bodyToText(body: string[]): string {
  return body.join("\n\n");
}

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  ђ: "dj",
  е: "e",
  ж: "z",
  з: "z",
  и: "i",
  ј: "j",
  к: "k",
  л: "l",
  љ: "lj",
  м: "m",
  н: "n",
  њ: "nj",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  ћ: "c",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "c",
  џ: "dz",
  ш: "s",
};

export function slugify(input: string): string {
  const lower = input.toLowerCase();
  let out = "";
  for (const ch of lower) {
    out += CYRILLIC_TO_LATIN[ch] ?? ch;
  }
  return out
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function coverPublicPath(slug: string, fileName = "cover.jpg"): string {
  return `/vesti-media/${slug}/${fileName}`;
}

const MONTHS_SR = [
  "ЈАНУАР",
  "ФЕБРУАР",
  "МАРТ",
  "АПРИЛ",
  "МАЈ",
  "ЈУН",
  "ЈУЛ",
  "АВГУСТ",
  "СЕПТЕМБАР",
  "ОКТОБАР",
  "НОВЕМБАР",
  "ДЕЦЕМБАР",
] as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Current moment as ISO for new posts */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Value for <input type="datetime-local"> in local timezone */
export function toDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return toDatetimeLocalValue(nowIso());
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

/** Parse datetime-local value to ISO */
export function fromDatetimeLocalValue(local: string): string {
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return nowIso();
  return d.toISOString();
}

/** Public display: "2. АВГУСТ 2026. · 19:45" */
export function formatNewsDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const day = d.getDate();
  const month = MONTHS_SR[d.getMonth()] ?? "";
  const year = d.getFullYear();
  const time = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  return `${day}. ${month} ${year}. · ${time}`;
}

/** Sort key — falls back for legacy items without publishedAt */
export function newsSortKey(item: { publishedAt?: string; date?: string; slug: string }): number {
  if (item.publishedAt) {
    const t = Date.parse(item.publishedAt);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}
