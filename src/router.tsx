import { useEffect, useState } from "react";

/**
 * Minimal client-side router (no dependencies).
 *
 * - `usePathname()` re-renders on browser back/forward and on `navigate()`.
 * - `navigate(to)` does an SPA push (no full reload) then notifies listeners.
 * - `<Link>` renders a real <a> (so right-click / cmd-click / SEO still work)
 *   but intercepts plain left-clicks to navigate without a reload.
 *
 * Route matching itself lives in main.tsx — this file stays intentionally dumb.
 */

// Push a new URL and let subscribers know. Dispatching `popstate` keeps the
// same code path as the browser's own back/forward navigation.
export function navigate(to: string) {
  if (to === window.location.pathname) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// Reactive access to the current pathname.
export function usePathname(): string {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return pathname;
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // Respect modifier clicks / new-tab / non-primary buttons — let the browser handle them.
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
