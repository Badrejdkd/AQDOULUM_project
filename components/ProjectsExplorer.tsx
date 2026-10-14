"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { countryLabels, projects, projectCountries, sortProjects, typeLabels, usedProjectTypes } from "@/lib/projects";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import ProjectCard from "./ProjectCard";

const ALL = "all";

export default function ProjectsExplorer({ lang }: { lang: Lang }) {
  const d = getDict(lang).portfolio;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const type = params.get("type") ?? ALL;
  const country = params.get("country") ?? ALL;

  const setFilter = (key: "type" | "country", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === ALL) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(
    () => projects.filter((p) => (type === ALL || p.type === type) && (country === ALL || p.country === country)).sort(sortProjects),
    [type, country],
  );

  const countFor = (key: "type" | "country", value: string) =>
    projects.filter((p) =>
      key === "type" ? p.type === value && (country === ALL || p.country === country) : p.country === value && (type === ALL || p.type === type),
    ).length;

  const countries = [...projectCountries].sort((a, b) => countryLabels[a]![lang].localeCompare(countryLabels[b]![lang], lang));
  const shown = (filtered.length > 1 ? d.shownMany : d.shownOne).replace("{n}", String(filtered.length));

  return (
    <>
      <div className="filters" role="group" aria-label={d.filterLabel}>
        <div className="filter-group">
          <span className="filter-group__label" id="f-type">
            {d.type}
          </span>
          <div className="chips" aria-labelledby="f-type">
            {[ALL, ...usedProjectTypes].map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setFilter("type", t)}>
                {t === ALL ? d.all : typeLabels[t as keyof typeof typeLabels][lang]}
                {t !== ALL && <span className="chip__count">{countFor("type", t)}</span>}
              </button>
            ))}
          </div>
        </div>
        {countries.length > 1 && (
          <div className="filter-group">
            <span className="filter-group__label" id="f-country">
              {d.country}
            </span>
            <div className="chips" aria-labelledby="f-country">
              {[ALL, ...countries].map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={country === c} onClick={() => setFilter("country", c)}>
                  {c === ALL ? d.all : countryLabels[c]![lang]}
                  {c !== ALL && <span className="chip__count">{countFor("country", c)}</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="results-bar" aria-live="polite">
        <span>{shown}</span>
        {(type !== ALL || country !== ALL) && (
          <button type="button" className="reset-btn" onClick={() => router.replace(pathname, { scroll: false })}>
            {d.reset}
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="empty-state">{d.empty}</div>
      )}
    </>
  );
}
