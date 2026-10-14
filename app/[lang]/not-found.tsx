import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

/* Page 404 bilingue (la langue n'est pas connue à ce niveau). */
export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container page-hero__inner">
        <span className="eyebrow">Error 404 · Erreur 404</span>
        <h1>Page not found.</h1>
        <p>This page does not exist or has been moved. · Cette page n&apos;existe pas ou a été déplacée.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/en" className="btn btn--accent">
            Back to home <ArrowRight />
          </Link>
          <Link href="/fr" className="btn btn--ghost btn--ghost-dark">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
