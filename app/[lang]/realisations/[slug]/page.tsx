import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/Blocks";
import ProjectCard, { ProjectMedia } from "@/components/ProjectCard";
import { ArrowRight } from "@/components/Icons";
import { countryLabels, getProject, projects, statusLabels, typeLabels } from "@/lib/projects";
import { getDict } from "@/lib/dict";
import { href, locales, tx, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta(lang, `/realisations/${slug}`, tx(p.title, lang), tx(p.summary, lang));
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const d = getDict(lang);
  const f = d.project.facts;

  const country = countryLabels[project.country]?.[lang] ?? project.country;
  const city = typeof project.city === "string" ? project.city : tx(project.city, lang);
  const location = project.cities ? `${project.cities.join(", ")} (${country})` : city ? `${city}, ${country}` : country;

  const related = projects
    .filter((p) => p.slug !== project.slug && (p.type === project.type || p.country === project.country))
    .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
    .slice(0, 3);

  const facts: [string, string | undefined][] = [
    [f.type, typeLabels[project.type][lang]],
    [f.location, location],
    [f.client, tx(project.client, lang)],
    [f.surface, tx(project.surface, lang)],
    [f.scale, tx(project.amount, lang)],
    [f.duration, tx(project.duration, lang)],
    [project.period ? f.period : f.year, project.period ?? (project.year ? String(project.year) : undefined)],
    [f.status, project.status ? statusLabels[project.status][lang] : undefined],
  ];

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ href: "/realisations", label: d.portfolio.metaTitle }, { label: tx(project.title, lang)! }]}
        eyebrow={`${typeLabels[project.type][lang]} · ${country}`}
        title={tx(project.title, lang)}
        intro={tx(project.summary, lang)}
      />

      <section className="section">
        <div className="container">
          <div className="detail-media" style={{ position: "relative" }}>
            <ProjectMedia project={project} lang={lang} sizes="(min-width: 1240px) 1240px, 100vw" />
          </div>

          <div className="split split--wide-left mt-48">
            <div className="stack" style={{ gap: 40 }}>
              <div className="stack">
                <span className="eyebrow">{d.project.scope}</span>
                <ul className="check-list">
                  {project.scope.map((s) => (
                    <li key={s.fr}>{s[lang]}</li>
                  ))}
                </ul>
              </div>
              <div className="stack">
                <span className="eyebrow">{d.project.highlights}</span>
                <ul className="check-list">
                  {project.highlights.map((s) => (
                    <li key={s.fr}>{s[lang]}</li>
                  ))}
                </ul>
              </div>
            </div>
            <dl className="facts">
              {facts
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>
          </div>

          {project.gallery && project.gallery.length > 1 && (
            <div className="mt-48 stack">
              <span className="eyebrow">{d.project.gallery}</span>
              <div className="gallery">
                {project.gallery.map((g) => (
                  <a key={g.src} href={g.src} target="_blank" rel="noopener noreferrer" className="gallery__item">
                    <Image src={g.src} alt={g.alt[lang]} fill sizes="(min-width: 900px) 33vw, 100vw" style={{ objectFit: "cover" }} />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-48">
            <Link href={href("/realisations", lang)} className="link-arrow">
              {d.common.backPortfolio} <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--alt">
          <div className="zellige" aria-hidden />
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{d.project.seeAlso}</span>
              <h2>{d.project.similar}</h2>
            </div>
            <div className="grid-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand lang={lang} />
    </>
  );
}
