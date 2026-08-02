"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "cdi-theme";

/**
 * Runs before first paint so the correct theme is on <html> when the browser
 * paints, rather than a light flash followed by a swap. Light is the default;
 * a stored choice wins, and `?theme=dark` / `?theme=light` overrides both so a
 * link can carry its own appearance. System preference is deliberately not
 * consulted — the brief asks for light as the default regardless — but the
 * choice persists, so a dark-preferring visitor sets it once.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var t=q==="dark"||q==="light"?q:localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})();`;

/**
 * `<html data-theme>` is the source of truth — the pre-paint script above sets
 * it before React exists, so React subscribes to it rather than owning it.
 * That is what useSyncExternalStore is for, and it avoids a setState-in-effect
 * reconciliation on every mount.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** The server always renders light, matching the `data-theme` on <html>. */
function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing or storage disabled — the theme still applies for
      // this page view, it just will not be remembered.
    }
    listeners.forEach((l) => l());
  }, []);

  return { theme, toggle };
}
