import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { IconCompass, IconHandshake, IconShield, IconTarget, IconPeople, IconLeaf } from "@/components/Icons";
import { cities } from "@/lib/site";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const a = getDict(lang).about;
  return pageMeta(lang, "/a-propos", a.metaTitle, a.metaDescription);
}

const valueIcons = [IconShield, IconTarget, IconHandshake, IconPeople, IconLeaf, IconCompass];

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const a = d.about;

  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: a.eyebrow }]} eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      <section className="section">
        <div className="container split">
          <div className="stack">
            <span className="eyebrow">{a.visionEyebrow}</span>
            <h2 style={{ fontSize: "clamp(32px, 4.2vw, 50px)" }}>{a.vision}</h2>
          </div>
          <div className="stack">
            <span className="eyebrow">{a.missionEyebrow}</span>
            <p className="lead">{a.mission}</p>
            <ul className="check-list mt-8">
              {a.missionPoints.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead split eyebrow={a.teamsEyebrow} title={a.teamsTitle} intro={a.teamsIntro} />
          <div className="grid-3">
            {d.teams.map((t, i) => (
              <article className="card" key={t.title}>
                <span className="card__index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="zellige" aria-hidden />
        <div className="container split split--center">
          <div className="stack">
            <span className="eyebrow">{a.locEyebrow}</span>
            <h2 style={{ fontSize: "clamp(32px, 4.2vw, 50px)" }}>{a.locTitle}</h2>
            <p className="lead" style={{ color: "var(--text)" }}>
              {a.locTextBefore} {cities.slice(0, -1).join(", ")} {a.locAnd} {cities.at(-1)} {a.locTextAfter}
            </p>
          </div>
          <div className="contact-info">
            {d.offices.map((o) => (
              <div className="contact-info__block" key={o.city}>
                <span className="contact-info__label">{o.role}</span>
                <span className="contact-info__value">
                  {o.city}, {d.country}
                </span>
                <span className="text-muted" style={{ fontSize: 15 }}>
                  {o.address}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={a.valuesEyebrow} title={a.valuesTitle} />
          <div className="grid-3">
            {a.values.map(({ title, text }, i) => {
              const Icon = valueIcons[i]!;
              return (
                <article className="card" key={title}>
                  <Icon className="card__icon" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={a.ctaTitle} />
    </>
  );
}
