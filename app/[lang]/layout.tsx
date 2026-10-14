import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource-variable/open-sans";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { getDict } from "@/lib/dict";
import { isLang, locales } from "@/lib/i18n";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${d.meta.tagline}`, template: `%s | ${site.name}` },
    description: d.meta.description,
    applicationName: site.name,
    keywords:
      lang === "fr"
        ? ["entreprise de construction", "BTP", "bâtiment", "rénovation", "aménagement", "menuiserie aluminium", "verre trempé", "Khénifra", "Rabat", "Maroc", "AQDOULUM"]
        : ["construction company", "building", "renovation", "fit-out", "aluminium joinery", "tempered glass", "Khénifra", "Rabat", "Morocco", "AQDOULUM"],
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${site.name} — ${d.meta.tagline}`,
      description: d.meta.description,
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${d.meta.tagline}`,
      description: d.meta.description,
      images: ["/brand/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0e2a3b",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/logo-navy.png`,
    email: site.email,
    telephone: site.phone,
    areaServed: ["MA", "International"],
    founder: { "@type": "Person", name: site.manager, jobTitle: d.managerRole },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressCountry: "MA",
    },
  };

  return (
    <html lang={lang}>
      <body>
        <a className="skip-link" href="#contenu">
          {d.common.skip}
        </a>
        <Header lang={lang} />
        <main id="contenu">{children}</main>
        <Footer lang={lang} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
