import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cities, site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getDict } from "@/lib/dict";
import { href, type Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import ProjectCard from "@/components/ProjectCard";
import Services from "@/components/Services";
import { CtaBand, SectionHead } from "@/components/Blocks";
import { ArrowRight, IconShield, IconLeaf, IconScale, IconWhatsapp } from "@/components/Icons";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return pageMeta(lang, "/");
}

/* Photos du collage de l'accueil (textes alternatifs dans lib/dict.ts → home.collageAlts) */
const collage = [
  { cls: "diamond--a diamond--orange", src: "/accueil/chantier-construction.jpg" },
  { cls: "diamond--b", src: "/projets/villas/villa-piscine.jpg" },
  { cls: "diamond--c diamond--teal", src: "/accueil/batiment-livre.jpg" },
  { cls: "diamond--d diamond--teal", src: "/projets/aluminium/alu-garde-corps-escalier.jpg" },
  { cls: "diamond--e", src: "/projets/faculte/faculte-vue-ensemble.jpg" },
];

const qseIcons = [IconShield, IconScale, IconLeaf];

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const h = d.home;
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="zellige" aria-hidden />
        <div className="hero__corner" aria-hidden />
        <div className="container" style={{ position: "relative" }}>
          <div className="hero__grid">
            <div className="hero__content">
              <h1>
                {h.titleA} <br />
                <em>{h.titleEm}</em>
                <br />
                {h.titleB}
              </h1>
              <p className="hero__subtitle">{h.subtitle}</p>
              <p className="hero__lead">{h.lead}</p>
              <div className="hero__actions">
                <Link href={href("/contact", lang)} className="btn btn--accent">
                  {d.common.quote} <ArrowRight />
                </Link>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
                  <IconWhatsapp /> {d.common.whatsapp}
                </a>
              </div>
              <div className="hero__tags">
                {h.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="diamonds" aria-label={h.collageLabel}>
              <span className="diamond-chip" style={{ top: "44%", left: "-2%" }} aria-hidden />
              <span className="diamond-chip diamond-chip--navy" style={{ top: "-2%", left: "44%", width: "7%" }} aria-hidden />
              <span className="diamond-chip" style={{ bottom: "-1%", left: "47%", width: "6%" }} aria-hidden />
              {collage.map((c, i) => (
                <div key={c.src} className={`diamond ${c.cls}`}>
                  <Image src={c.src} alt={h.collageAlts[i] ?? ""} width={600} height={600} sizes="(min-width: 1000px) 280px, 45vw" priority={i === 0} />
                </div>
              ))}
            </div>
          </div>

          <div className="hero__meta">
            {d.keyFigures.map((f) => (
              <div className="figure" key={f.label}>
                <div className="figure__value">
                  {f.value}
                  {f.unit && <small>{f.unit}</small>}
                </div>
                <p className="figure__label">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRODUITS & SERVICES ---------- */}
      <section className="section section--white">
        <div className="container">
          <SectionHead split eyebrow={h.servicesEyebrow} title={h.servicesTitle} intro={h.servicesIntro} />
          <Services lang={lang} />
        </div>
      </section>

      {/* ---------- QUI SOMMES-NOUS ---------- */}
      <section className="section section--alt">
        <div className="zellige" aria-hidden />
        <div className="container split split--wide-left split--center">
          <div className="stack">
            <span className="eyebrow">{h.aboutEyebrow}</span>
            <p className="quote">{h.aboutQuote}</p>
          </div>
          <div className="stack">
            <p className="lead" style={{ color: "var(--text)" }}>
              {h.aboutLead}
            </p>
            <p className="text-muted">{h.aboutText}</p>
            <div>
              <Link href={href("/a-propos", lang)} className="link-arrow">
                {h.aboutLink} <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- RÉALISATIONS ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead split eyebrow={h.projectsEyebrow} title={h.projectsTitle} intro={h.projectsIntro} />
          <div className="grid-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} />
            ))}
          </div>
          <div className="mt-48">
            <Link href={href("/realisations", lang)} className="btn btn--ghost btn--ghost-dark">
              {h.projectsLink} <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- QSE ---------- */}
      <section className="section section--dark">
        <div className="container split">
          <div className="stack">
            <span className="eyebrow">{h.qseEyebrow}</span>
            <h2 style={{ fontSize: "clamp(34px, 4.6vw, 56px)" }}>{h.qseTitle}</h2>
            <p className="lead" style={{ color: "var(--muted-on-dark)" }}>
              {h.qseText}
            </p>
            <div>
              <Link href={href("/qualite-securite-conformite", lang)} className="link-arrow">
                {h.qseLink} <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="grid-2" style={{ gridTemplateColumns: "1fr" }}>
            {h.qseCards.map(({ t, d: text }, i) => {
              const Icon = qseIcons[i]!;
              return (
                <div key={t} className="card" style={{ gridTemplateColumns: "46px 1fr", columnGap: 20 }}>
                  <Icon className="card__icon" />
                  <div className="stack" style={{ gap: 6 }}>
                    <h3 style={{ fontSize: 23 }}>{t}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- MAROC & INTERNATIONAL ---------- */}
      <section className="section section--alt section--tight">
        <div className="zellige" aria-hidden />
        <div className="container split split--center">
          <div className="stack">
            <span className="eyebrow">{h.zonesEyebrow}</span>
            <h2 style={{ fontSize: "clamp(30px, 3.8vw, 46px)" }}>{h.zonesTitle}</h2>
            <p className="text-muted">{h.zonesText}</p>
          </div>
          <div className="presence" style={{ color: "var(--navy)" }}>
            {cities.map((c) => (
              <span key={c} style={{ borderColor: "rgba(14,42,59,.2)", background: "#fff" }}>
                {c}
              </span>
            ))}
            <span style={{ borderColor: "var(--orange)", background: "var(--orange)", color: "#fff" }}>{h.international}</span>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
