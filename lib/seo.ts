import type { Metadata } from "next";
import { getDict } from "./dict";
import { locales, type Lang } from "./i18n";

/** Métadonnées d'une page, avec les liens vers les versions FR / EN. */
export function pageMeta(lang: Lang, path: string, title?: string, description?: string): Metadata {
  const d = getDict(lang);
  const suffix = path === "/" ? "" : path;
  return {
    ...(title ? { title } : {}),
    description: description ?? d.meta.description,
    alternates: {
      canonical: `/${lang}${suffix}`,
      languages: Object.fromEntries([...locales.map((l) => [l, `/${l}${suffix}`]), ["x-default", `/en${suffix}`]]),
    },
    openGraph: {
      locale: lang === "fr" ? "fr_MA" : "en_US",
      url: `/${lang}${suffix}`,
      ...(title ? { title } : {}),
      description: description ?? d.meta.description,
    },
  };
}
