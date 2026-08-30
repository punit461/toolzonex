import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Site has grown to 800+ static pages sharing one large toolRegistry
  // module; the default worker parallelism during page-data collection
  // was duplicating enough of that module across workers to OOM CI
  // runners. Capping workers trades some build time for a bounded
  // memory footprint.
  experimental: {
    cpus: 2,
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
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      ],
    },
  ],
};

export default nextConfig;
