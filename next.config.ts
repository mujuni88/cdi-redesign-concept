import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>/, so the export needs a base
// path. Set REPO_BASE_PATH at build time; local dev and any root-domain host
// (Vercel, Netlify) work unchanged with it unset.
const basePath = process.env.REPO_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Both routes prerender as static content, so a static export loses nothing.
  output: "export",
  basePath,
  // Emit /route/index.html rather than /route.html — more reliable on static hosts.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
