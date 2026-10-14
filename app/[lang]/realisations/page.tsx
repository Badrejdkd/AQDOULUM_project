import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand, PageHero } from "@/components/Blocks";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const p = getDict(lang).portfolio;
  return pageMeta(lang, "/realisations", p.metaTitle, p.metaDescription);
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  const p = getDict(lang).portfolio;
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: p.metaTitle }]} eyebrow={p.eyebrow} title={p.title} intro={p.intro} />
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="empty-state">{p.loading}</div>}>
            <ProjectsExplorer lang={lang} />
          </Suspense>
        </div>
      </section>
      <CtaBand lang={lang} title={p.ctaTitle} />
    </>
  );
}
