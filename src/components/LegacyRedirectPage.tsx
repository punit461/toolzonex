import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Shared metadata + markup for the dynamic legacy-redirect routes at
 * src/app/tools/[slug]/page.tsx and src/app/calculators/[slug]/page.tsx.
 * Replaces 84 near-identical per-tool redirect-stub page.tsx files with
 * two data-driven routes reading from src/data/legacy-redirects.ts.
 */

export function generateRedirectMetadata(map: Record<string, string>, slug: string): Metadata {
  const newPath = map[slug];
  if (!newPath) return {};
  return {
    title: "Redirecting... - ToolZoneX",
    robots: { index: false, follow: true },
    alternates: { canonical: newPath },
  };
}

export function LegacyRedirectPage({ map, slug }: { map: Record<string, string>; slug: string }) {
  const newPath = map[slug];
  if (!newPath) notFound();

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${newPath}`} />
      <p>
        This page has moved to <a href={newPath}>{newPath}</a>.
      </p>
    </>
  );
}
