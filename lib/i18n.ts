export const locales = ["en", "fr"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

/** Texte traduit : { en: "...", fr: "..." } */
export type Tx = { en: string; fr: string };

export const tx = (v: Tx | string | undefined, lang: Lang): string | undefined =>
  v === undefined ? undefined : typeof v === "string" ? v : v[lang];

export const isLang = (x: string): x is Lang => (locales as readonly string[]).includes(x);

/** Construit un lien localisé : href("/contact", "fr") → "/fr/contact" */
export const href = (path: string, lang: Lang) => `/${lang}${path === "/" ? "" : path}`;

/** Remplace la langue dans un chemin : /en/contact → /fr/contact */
export const switchLang = (pathname: string, lang: Lang) => {
  const parts = pathname.split("/");
  if (parts[1] && isLang(parts[1])) parts[1] = lang;
  else parts.splice(1, 0, lang);
  return parts.join("/") || `/${lang}`;
};
