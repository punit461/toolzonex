'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 page_view on client-side route changes.
 *
 * This is a static export (`output: "export"`), so every route is its own
 * HTML file, but Next's client router still does SPA-style navigation
 * between them after hydration — the gtag snippet in layout.tsx only
 * auto-tracks the very first load, so without this, every tool page a
 * visitor navigates to after landing would be invisible in GA4.
 */
export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial mount — the gtag('config', ...) call in layout.tsx
    // already records the landing pageview.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      send_to: measurementId,
    });
  }, [pathname, measurementId]);

  return null;
}
