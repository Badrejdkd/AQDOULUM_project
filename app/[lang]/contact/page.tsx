import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";
import { IconWhatsapp } from "@/components/Icons";
import { site } from "@/lib/site";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = getDict(lang).contact;
  return pageMeta(lang, "/contact", c.metaTitle, c.metaDescription);
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const c = d.contact;

  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: d.nav["/contact"] }]} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <section className="section">
        <div className="container split split--wide-left">
          <ContactForm lang={lang} />

          <aside className="contact-info">
            <div className="contact-info__block contact-info__block--dark">
              <span className="contact-info__label">{d.managerRole}</span>
              <span className="contact-info__value">{site.manager}</span>
              <span className="text-muted" style={{ fontSize: 14 }}>
                {c.activities}
              </span>
            </div>
            <div className="contact-info__block">
              <span className="contact-info__label">{c.email}</span>
              <span className="contact-info__value">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </div>
            <div className="contact-info__block">
              <span className="contact-info__label">{c.phone}</span>
              <span className="contact-info__value">
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </span>
              <span className="text-muted" style={{ fontSize: 14 }}>
                {d.hours}
              </span>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--teal" style={{ marginTop: 12, justifySelf: "start" }}>
                <IconWhatsapp /> {d.common.whatsappWrite}
              </a>
            </div>
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
            <div className="contact-info__block">
              <span className="contact-info__label">{c.social}</span>
              <span style={{ fontSize: 15 }}>
                {c.socialText} <strong>{site.social.instagram.label}</strong>
              </span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
