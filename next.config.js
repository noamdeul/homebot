/** @type {import('next').NextConfig} */

// When building for GitHub Pages (or any other static host), set
// STATIC_EXPORT=true. The Pages workflow also passes BASE_PATH so the
// app is correctly served from `/<repo>` instead of the domain root.
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    basePath,
    assetPrefix: basePath || undefined,
  }),
};

module.exports = nextConfig;
