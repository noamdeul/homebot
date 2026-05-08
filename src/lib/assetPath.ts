/**
 * Prefix a `/public` asset path with the configured `basePath` so it resolves
 * correctly when the site is served from a sub-path (e.g. GitHub Pages at
 * `/homebot`). Needed because `next/image` does NOT apply `basePath`
 * automatically when `images.unoptimized` is true.
 *
 * Pass-through (no-op) for absolute URLs and for builds without a basePath.
 */
export function assetPath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
