'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isAdFreeRoute } from '../data/adFreeRoutes';

/**
 * Loads the AdSense (Auto Ads) script everywhere except child-directed pages.
 * A client component because the root layout can't see the current route;
 * usePathname() also works during static export, so excluded pages ship
 * without the script tag or its preload at all.
 */
export default function AdSenseScript({ client }: { client: string }) {
  const pathname = usePathname();
  if (isAdFreeRoute(pathname)) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
