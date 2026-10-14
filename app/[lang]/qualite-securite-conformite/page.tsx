import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { IconHandshake, IconLeaf, IconScale, IconShield } from "@/components/Icons";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const q = getDict(lang).quality;
  return pageMeta(lang, "/qualite-securite-conformite", q.metaTitle, q.metaDescription);
}

/* ⚠️ Certifications et indicateurs d'exemple (lib/dict.ts → quality) : n'affichez que ce que l'entreprise possède réellement. */
const commitIcons = [IconShield, IconScale, IconHandshake, IconLeaf];

export default async function QhsePage({ params }: Props) {
  const { lang } = await params;
  const q = getDict(lang).quality;

  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: q.title.replace(/\.$/, "") }]} eyebrow={q.eyebrow} title={q.title} intro={q.intro} />

      <section className="section">
        <div className="container split split--center">
          <div className="stack">
            <span className="eyebrow">{q.policyEyebrow}</span>
            <p className="quote">{q.policyQuote}</p>
          </div>
          <div className="stack">
            <p className="lead">{q.policyLead}</p>
            <p className="text-muted">{q.policyText}</p>
          </div>
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container">
          <div className="stat-band">
            {q.stats.map((s) => (
              <div key={s.l}>
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead split eyebrow={q.smsEyebrow} title={q.smsTitle} intro={q.smsIntro} />
          <div className="grid-3">
            {q.certs.map((c) => (
              <article className="cert" key={c.title}>
                <div className="cert__badge">
                  <span>{c.code}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={q.commitEyebrow} title={q.commitTitle} />
          <div className="grid-2">
            {q.commitments.map(({ title, points }, i) => {
              const Icon = commitIcons[i]!;
              return (
                <article className="card" key={title}>
                  <Icon className="card__icon" />
                  <h3>{title}</h3>
                  <ul className="check-list">
                    {points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHead eyebrow={q.qaEyebrow} title={q.qaTitle} />
          <div className="rows">
            {q.steps.map((s, i) => (
              <div className="row" key={s.t}>
                <span className="row__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={q.ctaTitle} text={q.ctaText} />
    </>
  );
}
