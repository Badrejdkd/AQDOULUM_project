import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [...routes, ...projects.map((p) => `/realisations/${p.slug}`)];
  return paths.flatMap((path) => {
    const suffix = path === "/" ? "" : path;
    const languages = Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${suffix}`]));
    return locales.map((lang) => ({
      url: `${site.url}/${lang}${suffix}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/realisations/") ? 0.6 : 0.8,
      alternates: { languages },
    }));
  });
}
