import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box, Container } from "@mui/material";

const inter = localFont({
  src: '../assets/fonts/Inter-Regular.woff2',
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const viewport: Viewport = {
  themeColor: '#1a56db',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ToolZoneX — Smart Tools for Every Decision",
    template: "%s | ToolZoneX",
  },
  description: "Free online calculators for Finance, Health, and Utilities — EMI, SIP, Income Tax, BMI, Gold Rate, PPF, GST and more. Instant, accurate results.",
  keywords: [
    "online calculator", "free calculator", "EMI calculator", "SIP calculator",
    "income tax calculator", "BMI calculator", "PPF calculator", "GST calculator",
    "India finance tools", "mutual fund calculator", "loan EMI calculator",
    "gold rate calculator", "retirement calculator", "age calculator"
  ],
  authors: [{ name: "ToolZoneX" }],
  creator: "ToolZoneX",
  publisher: "ToolZoneX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ToolZoneX",
    title: "ToolZoneX — Smart Tools for Every Decision",
    description: "Free online calculators for Finance, Health, and Utilities. EMI, SIP, Income Tax, BMI, Gold Rate, PPF, GST and more.",
    images: [
      {
        url: "/toolzonex/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolZoneX - Free Online Calculators for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolZoneX — Smart Tools for Every Decision",
    description: "Free online calculators for Finance, Health, and Utilities.",
    images: ["/toolzonex/og-image.png"],
    creator: "@toolzonex",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ToolZoneX",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// JSON-LD WebSite Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToolZoneX",
  "url": SITE_URL,
  "description": "Free online calculators for Finance, Health, and Utilities",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/toolzonex/logo.png`
    }
  }
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '';
  if (adsensePublisherId && !adsensePublisherId.startsWith('ca-')) {
    adsensePublisherId = `ca-${adsensePublisherId}`;
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {adsensePublisherId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <ThemeRegistry>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" sx={{ mt: 4, mb: 4, flex: 1, maxWidth: '1200px !important' }}>
              {children}
            </Container>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
