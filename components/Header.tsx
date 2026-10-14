"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routes } from "@/lib/site";
import { getDict } from "@/lib/dict";
import { href, locales, switchLang, type Lang } from "@/lib/i18n";
import { ArrowRight, CloseIcon, MenuIcon } from "./Icons";

function isActive(pathname: string, lang: Lang, route: string) {
  const full = href(route, lang);
  return route === "/" ? pathname === full : pathname === full || pathname.startsWith(full + "/");
}

function LangSwitch({ lang, pathname, className = "" }: { lang: Lang; pathname: string; className?: string }) {
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language / Langue">
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLang(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          title={`${getDict(lang).common.switchTo} ${getDict(l).langName}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const pathname = usePathname() || `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const mainRoutes = routes.filter((r) => r !== "/contact");

  return (
    <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
      <div className="container site-header__inner">
        <Link href={href("/", lang)} className="brand" aria-label={`AQDOULUM — ${d.nav["/"]}`}>
          <Image src="/brand/symbol-navy.png" alt="" width={365} height={558} priority />
          <Image className="brand__word" src="/brand/wordmark-navy.png" alt="AQDOULUM" width={739} height={107} priority />
        </Link>

        <nav className="main-nav" aria-label={d.common.mainNav}>
          {mainRoutes.map((r) => (
            <Link key={r} href={href(r, lang)} aria-current={isActive(pathname, lang, r) ? "page" : undefined}>
              {d.nav[r]}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LangSwitch lang={lang} pathname={pathname} />
          <Link href={href("/contact", lang)} className="btn btn--accent header-cta">
            {d.nav["/contact"]}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? d.common.menuClose : d.common.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-label={d.common.mobileNav} aria-hidden={!open}>
        {mainRoutes.map((r) => (
          <Link key={r} href={href(r, lang)} tabIndex={open ? 0 : -1} aria-current={isActive(pathname, lang, r) ? "page" : undefined}>
            {d.nav[r]}
            <ArrowRight width={20} height={20} />
          </Link>
        ))}
        <Link href={href("/contact", lang)} className="btn btn--accent" tabIndex={open ? 0 : -1}>
          {d.common.mobileCta} <ArrowRight />
        </Link>
      </nav>
    </header>
  );
}
