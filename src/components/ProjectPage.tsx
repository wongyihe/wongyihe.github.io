import { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Link } from "../router";
import { markdownToReact } from "../utils/markdownToReact";
import type { Project } from "../data/projects";
import "../styles/project.css";

/**
 * Reusable project case-study page. Renders any project that has a `detail`
 * block. Every field is optional except title/summary/sections, so a project
 * only shows the sections it has content for.
 */
export function ProjectPage({ project }: { project: Project }) {
  const detail = project.detail!; // caller guarantees this exists
  const hero = detail.hero ?? project.media;

  // Land at the top when opening a project (SPA navigation preserves scroll).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [detail.slug]);

  const meta = detail.meta;
  const metaRows: { key: string; value: React.ReactNode }[] = [];
  if (meta.role) metaRows.push({ key: "Role", value: meta.role });
  if (meta.year) metaRows.push({ key: "Year", value: meta.year });
  if (meta.venue) metaRows.push({ key: "Venue", value: meta.venue });
  if (meta.collaborators?.length)
    metaRows.push({ key: "Collaborators", value: meta.collaborators.join(", ") });
  if (meta.methods?.length)
    metaRows.push({ key: "Methods", value: meta.methods.join(", ") });
  if (meta.technologies?.length)
    metaRows.push({ key: "Technologies", value: meta.technologies.join(", ") });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="project-page">
        <article className="project-page__inner">
          <Link to="/" className="project-page__back">
            ← Back to home
          </Link>

          <p className="project-page__category">{project.category}</p>
          <h1 className="project-page__title">{project.title}</h1>
          <p className="project-page__summary">{detail.summary}</p>

          {hero && (
            <div className="project-page__hero">
              {hero.type === "image" ? (
                <img src={hero.src} alt={hero.alt ?? project.title} />
              ) : (
                <video autoPlay loop muted playsInline>
                  <source src={hero.src} />
                </video>
              )}
            </div>
          )}

          {metaRows.length > 0 && (
            <div className="project-page__meta">
              {metaRows.map((row) => (
                <div key={row.key}>
                  <p className="project-page__meta-key">{row.key}</p>
                  <p className="project-page__meta-val">{row.value}</p>
                </div>
              ))}
            </div>
          )}

          {detail.sections.map((section, i) => (
            <section className="project-page__section" key={i}>
              <h2>{section.heading}</h2>
              {section.body?.map((para, j) => (
                <p key={j}>{markdownToReact(para)}</p>
              ))}
              {section.list && section.list.length > 0 && (
                <ul>
                  {section.list.map((item, j) => (
                    <li key={j}>{markdownToReact(item)}</li>
                  ))}
                </ul>
              )}
              {section.quote && (
                <blockquote className="project-page__quote">
                  <p>{section.quote.text}</p>
                  {section.quote.attribution && (
                    <cite>{section.quote.attribution}</cite>
                  )}
                </blockquote>
              )}
              {section.figures?.map((fig, j) => (
                <figure className="project-page__figure" key={j}>
                  <img src={fig.src} alt={fig.alt} loading="lazy" />
                  <figcaption>{fig.caption}</figcaption>
                </figure>
              ))}
            </section>
          ))}

          {detail.publications && detail.publications.length > 0 && (
            <section className="project-page__section">
              <h2>{detail.linksLabel ?? "Publications and links"}</h2>
              <div className="project-page__links">
                {detail.publications.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="project-page__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          )}

          {detail.media && detail.media.length > 0 && (
            <section className="project-page__section">
              <h2>Media</h2>
              <div className="project-page__gallery">
                {detail.media.map((m, i) => (
                  <div className="project-page__gallery-item" key={i}>
                    <img src={m.src} alt={m.alt ?? `${project.title} image ${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {detail.citation && (
            <section className="project-page__section">
              <h2>Citation</h2>
              <p className="project-page__citation">{detail.citation}</p>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}

/** Fallback shown when a /projects/<slug>/ URL doesn't match a known project. */
export function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="project-notfound">
        <h1>Project not found</h1>
        <p>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
