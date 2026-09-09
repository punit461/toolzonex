import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Site has grown to 1700+ static pages sharing one large toolRegistry
  // module (~1350 pages import it directly). Two knobs matter here and
  // pull in opposite directions, so both are set explicitly:
  //  - cpus caps how many worker PROCESSES run the build. Too many and
  //    each spawns its own copy of the compiled app (which bakes in
  //    toolRegistry), duplicating memory across workers.
  //  - staticGenerationMaxConcurrency caps how many pages each worker
  //    renders IN PARALLEL. With only 2 workers splitting ~1700+ pages,
  //    each worker sequentially renders ~800+ pages over the build; the
  //    default of 8 concurrent in-flight renders per worker was letting
  //    that per-page render state pile up faster than GC could reclaim
  //    it, which is what was pushing CI past the 8GB heap ceiling.
  // Both trade build time for a bounded memory footprint.
  experimental: {
    cpus: 2,
    staticGenerationMaxConcurrency: 2,
  },
  eslint: {
    // Pre-existing repo state had no ESLint config at all, so `next build`
    // never gated on it. A config now exists (added to verify new code),
    // but ~380 pre-existing findings across unrelated files shouldn't start
    // blocking production builds as a side effect — run `npm run lint`
    // manually instead.
    ignoreDuringBuilds: true,
  },
  compress: true,
  poweredByHeader: false,
  // Next's `headers()` config has no effect under `output: "export"` — static
  // export produces plain files with no Node server to apply it. The actual
  // enforcement point is public/_headers (a Cloudflare Pages convention, copied
  // verbatim into out/ at build time), which carries this same header set plus
  // a CSP. Keep the two in sync if either changes.
};

export default nextConfig;
