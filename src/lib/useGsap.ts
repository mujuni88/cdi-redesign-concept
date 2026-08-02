"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * True when the visitor has asked the system for less motion.
 *
 * The server snapshot is `false` so markup matches the animated variant, which
 * is safe here: every animated element's default CSS state is already its final
 * state, so a reduced-motion visitor sees correct content before hydration.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Scopes a GSAP context to a ref and tears it down on unmount.
 *
 * Under `prefers-reduced-motion` the callback never runs at all. That is only
 * safe because every animated element in this project is authored so its final
 * state is its default state — animation adds emphasis, it never reveals.
 */
export function useGsap(
  setup: (ctx: { scope: HTMLElement; gsap: typeof gsap }) => void,
  deps: unknown[] = [],
) {
  const scope = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !scope.current) return;
    const element = scope.current;
    const ctx = gsap.context(() => setup({ scope: element, gsap }), element);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);

  return scope;
}

export { gsap, ScrollTrigger };
