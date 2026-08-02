export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  /** Public URL or path to cover image */
  img: string;
};

export type NewsIndexEntry = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  img: string;
};

export type NewsWriteInput = {
  slug: string;
  date: string;
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

export function slugify(input: string): string {
  return input
    .toLowerCase()
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
