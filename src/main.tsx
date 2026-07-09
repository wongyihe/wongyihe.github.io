import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ProjectPage, ProjectNotFound } from "./components/ProjectPage.tsx";
import { projects } from "./data/projects.ts";
import { usePathname } from "./router.tsx";
import "./index.css";

/**
 * Tiny route switch (see src/router.tsx):
 *   /                     -> homepage (App)
 *   /projects/<slug>/     -> ProjectPage for that slug
 *   anything else         -> ProjectNotFound
 */
function Root() {
  const pathname = usePathname();
  const path = pathname.replace(/\/+$/, "") || "/"; // ignore trailing slash

  if (path === "/") return <App />;

  const match = path.match(/^\/projects\/([^/]+)$/);
  if (match) {
    const project = projects.find((p) => p.detail?.slug === match[1]);
    return project ? <ProjectPage project={project} /> : <ProjectNotFound />;
  }

  return <ProjectNotFound />;
}

createRoot(document.getElementById("root")!).render(<Root />);
