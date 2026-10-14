import Link from "next/link";
import Image from "next/image";
import { routes, site } from "@/lib/site";
import { getDict } from "@/lib/dict";
import { href, type Lang } from "@/lib/i18n";
import { IconFacebook, IconInstagram, IconMail, IconPhone, IconPin, IconWhatsapp } from "./Icons";

function Social({ label, url, icon }: { label: string; url: string; icon: React.ReactNode }) {
  const content = (
    <>
      <span className="site-footer__icon">{icon}</span>
      <span>{label}</span>
    </>
  );
  return (
    <li>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "contents" }}>
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export default function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="zellige" aria-hidden />
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Image src="/brand/logo-white.png" alt="AQDOULUM" width={739} height={716} style={{ height: 120, width: "auto" }} />
            <p style={{ maxWidth: 340 }}>
              {site.manager} — {d.managerRole}
              <br />
              {d.footer.blurb}
            </p>
          </div>

          <div>
            <h4>{d.footer.navigation}</h4>
            <ul>
              {routes.map((r) => (
                <li key={r}>
                  <Link href={href(r, lang)}>{d.nav[r]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{d.footer.services}</h4>
            <ul>
              {d.services.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{d.footer.contact}</h4>
            <ul className="site-footer__contact">
              <li>
                <span className="site-footer__icon">
                  <IconPhone />
                </span>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <span className="site-footer__icon">
                  <IconMail />
                </span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="site-footer__icon">
                  <IconPin />
                </span>
                <span>
                  {d.offices.map((o, i) => (
                    <span key={o.city} style={{ display: "block", marginTop: i ? 8 : 0 }}>
                      <strong style={{ color: "var(--white)", fontWeight: 600 }}>{o.city}</strong> — {o.address}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <span className="site-footer__icon">
                  <IconWhatsapp />
                </span>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <Social label={`Instagram · ${site.social.instagram.label}`} url={site.social.instagram.url} icon={<IconInstagram />} />
              <Social label={`Facebook · ${site.social.facebook.label}`} url={site.social.facebook.url} icon={<IconFacebook />} />
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {year} {site.legalName} — {d.footer.rights}
          </span>
          <span>{d.meta.footerTagline}</span>
        </div>
      </div>
    </footer>
  );
}
