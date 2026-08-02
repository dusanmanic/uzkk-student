export type SiteContent = {
  brand: string;
  footerBlurb: string;
  venueName: string;
  addressLine: string;
  addressShort: string;
  phone: string;
  phoneHref: string;
  email: string;
  mapsEmbedQuery: string;
  crestUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  sponsors: string[];
};

export type HomepageContent = {
  hero: {
    foundedLabel: string;
    brand: string;
    headlineBefore: string;
    headlineAccent: string;
    subcopy: string;
    heroImage: string;
    yearBadge: string;
  };
  competitions: { badge: string; name: string; url: string; urlLabel: string }[];
  historyTeaser: { eyebrow: string; title: string; body: string };
  schoolCta: { eyebrow: string; title: string; body: string };
  socialCtaTitle: string;
};

export type KlubContent = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  milestones: { year: string; text: string }[];
};

export type Player = {
  id: string;
  num: string;
  name: string;
  position: string;
  height: string;
  birthYear: number;
  birthplace: string;
  img: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  img: string;
};

export type TimContent = {
  seasonLabel: string;
  title: string;
  lead: string;
  players: Player[];
  staff: StaffMember[];
};

export type MladjeContent = {
  eyebrow: string;
  title: string;
  lead: string;
  enrollment: {
    title: string;
    text: string;
    ctaLabel: string;
    ctaMailto: string;
  };
  coaches: StaffMember[];
  selections: { id: string; name: string; age: string; img: string }[];
};

export type GalerijaContent = {
  eyebrow: string;
  title: string;
  lead: string;
  albums: { id: string; title: string; date: string; photos: string[] }[];
  videos: { id: string; title: string }[];
};

export type KontaktPageContent = {
  eyebrow: string;
  title: string;
  logoKitTitle: string;
  logoKitText: string;
};

export type ContentKey =
  | "site"
  | "homepage"
  | "klub"
  | "tim"
  | "mladje"
  | "galerija"
  | "kontakt";

export type ContentMap = {
  site: SiteContent;
  homepage: HomepageContent;
  klub: KlubContent;
  tim: TimContent;
  mladje: MladjeContent;
  galerija: GalerijaContent;
  kontakt: KontaktPageContent;
};

export const CONTENT_KEYS: ContentKey[] = [
  "site",
  "homepage",
  "klub",
  "tim",
  "mladje",
  "galerija",
  "kontakt",
];
