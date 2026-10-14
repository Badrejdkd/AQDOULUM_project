import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { getDict } from "@/lib/dict";
import { href, type Lang } from "@/lib/i18n";
import { ArrowRight } from "./Icons";
import Swoosh from "./Swoosh";

export function PageHero({
  lang,
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  lang: Lang;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  crumbs?: { href?: string; label: string }[];
}) {
  const d = getDict(lang);
  return (
    <section className="page-hero">
      <div className="zellige" aria-hidden />
      <div className="page-hero__art" aria-hidden>
        <Swoosh className="" />
        <Image className="page-hero__symbol" src="/brand/symbol-white.png" alt="" width={365} height={558} priority />
      </div>
      <span className="page-hero__accent" aria-hidden />
      <div className="container page-hero__inner">
        {crumbs && (
          <nav className="breadcrumb" aria-label={d.common.breadcrumb}>
            <Link href={href("/", lang)}>{d.common.home}</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span aria-hidden>/</span>
                {c.href ? <Link href={href(c.href, lang)}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  split,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  split?: boolean;
}) {
  if (split) {
    return (
      <div className="section-head section-head--split">
        <div className="stack">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        {intro && <p>{intro}</p>}
      </div>
    );
  }
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

export function CtaBand({ lang, title, text }: { lang: Lang; title?: string; text?: string }) {
  const d = getDict(lang);
  return (
    <section className="cta-band">
      <Swoosh dark="#0a2130" />
      <div className="container cta-band__inner">
        <div>
          <span className="eyebrow">{d.cta.eyebrow}</span>
          <h2 style={{ marginTop: 14 }}>{title ?? d.cta.title}</h2>
          <p>{text ?? d.cta.text}</p>
        </div>
        <Link href={href("/contact", lang)} className="btn btn--accent">
          {d.common.quote} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
