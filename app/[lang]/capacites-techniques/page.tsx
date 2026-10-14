import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = getDict(lang).capacities;
  return pageMeta(lang, "/capacites-techniques", c.metaTitle, c.metaDescription);
}

export default async function CapacitiesPage({ params }: Props) {
  const { lang } = await params;
  const c = getDict(lang).capacities;

  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: c.eyebrow }]} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      {/* Chiffres clés */}
      <section className="section section--tight">
        <div className="container">
          <div className="stat-band">
            {c.stats.map((s) => (
              <div key={s.l}>
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 compétences */}
      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow={c.domainsEyebrow} title={c.subtitle} />
          <div className="rows">
            {c.domains.map((dm, i) => (
              <div className="row" key={dm.title}>
                <span className="row__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{dm.title}</h3>
                <p>{dm.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="section section--alt">
        <div className="zellige" aria-hidden />
        <div className="container split split--center">
          <div className="stack">
            <span className="eyebrow">{c.commitmentEyebrow}</span>
            <p className="quote">{c.commitmentTitle}</p>
          </div>
          <div className="stack">
            <p className="lead" style={{ color: "var(--text)" }}>
              {c.commitment}
            </p>
            <ul className="check-list">
              {c.commitmentPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={c.ctaTitle} />
    </>
  );
}
