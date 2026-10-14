import Link from "next/link";
import Image from "next/image";
import { placeLabel, statusLabels, typeLabels, type Project } from "@/lib/projects";
import { href, tx, type Lang } from "@/lib/i18n";
import ProjectVisual from "./ProjectVisual";

export function ProjectMedia({ project, sizes, lang }: { project: Project; sizes: string; lang: Lang }) {
  const title = tx(project.title, lang)!;
  return project.image ? (
    <Image src={project.image} alt={title} fill sizes={sizes} style={{ objectFit: "cover" }} />
  ) : (
    <ProjectVisual type={project.type} seed={project.slug} label={title} />
  );
}

export default function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const extra = tx(project.surface, lang) ?? tx(project.amount, lang);
  return (
    <Link href={href(`/realisations/${project.slug}`, lang)} className="project-card">
      <div className="project-card__media">
        {project.status && (
          <span className={`project-card__status${project.status === "ongoing" ? " project-card__status--ongoing" : ""}`}>
            {statusLabels[project.status][lang]}
          </span>
        )}
        <ProjectMedia project={project} lang={lang} sizes="(min-width: 1024px) 33vw, (min-width: 720px) 50vw, 100vw" />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{typeLabels[project.type][lang]}</span>
          {(project.period || project.year) && (
            <>
              <span aria-hidden>·</span>
              <span>{project.period ?? project.year}</span>
            </>
          )}
        </div>
        <h3>{tx(project.title, lang)}</h3>
        <p className="project-card__place">
          {placeLabel(project, lang)}
          {extra ? ` — ${extra}` : ""}
        </p>
      </div>
    </Link>
  );
}
