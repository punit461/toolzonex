import type { Metadata } from "next";
import JwtExplained from "../../../components/pages/blogs/JwtExplained";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "JWT Explained: What's Actually Inside a JSON Web Token",
  description: "A JWT looks like random noise, but it's just base64url — no secret key needed to read it. Learn the header/payload/signature structure and the exp-check mistake that trips up implementations.",
  keywords: ["jwt explained", "json web token", "jwt structure", "jwt claims", "jwt signature", "how jwt works"],
  alternates: { canonical: "/blog/jwt-explained" },
  openGraph: {
    title: "JWT Explained: What's Actually Inside a JSON Web Token | ToolZoneX",
    description: "A JWT looks like random noise, but it's just base64url — here's what's actually inside.",
    url: `${SITE_URL}/blog/jwt-explained`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Explained: What's Actually Inside a JSON Web Token | ToolZoneX",
    description: "A JWT looks like random noise, but it's just base64url — here's what's actually inside.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "JWT Explained: What's Actually Inside a JSON Web Token",
  "description": "A JWT looks like random noise, but it's just base64url — no secret key needed to read it. Learn the header/payload/signature structure and the exp-check mistake that trips up implementations.",
  "url": `${SITE_URL}/blog/jwt-explained`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-08-22",
  "dateModified": "2026-08-22",
  "author": AUTHOR_PERSON_SCHEMA,
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    "sameAs": ORGANIZATION_SAME_AS
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <JwtExplained />
    </>
  );
}
