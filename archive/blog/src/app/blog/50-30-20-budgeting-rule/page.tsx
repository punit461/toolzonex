import type { Metadata } from "next";
import BudgetingRule from "../../../components/pages/blogs/BudgetingRule";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SAME_AS } from "../../../data/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "The 50/30/20 Budgeting Rule Explained",
  description: "Learn how to manage your money using the 50/30/20 budgeting rule — a simple framework for budgeting, saving, and reaching financial goals.",
  keywords: ["50/30/20 rule", "budgeting rule", "budgeting tips", "personal finance", "savings rule", "budget allocation", "financial planning"],
  alternates: { canonical: "/blog/50-30-20-budgeting-rule" },
  openGraph: {
    title: "The 50/30/20 Budgeting Rule - Complete Guide | ToolZoneX",
    description: "Learn how to manage your money effectively using the 50/30/20 budgeting rule.",
    url: `${SITE_URL}/blog/50-30-20-budgeting-rule`,
    type: "article",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 50/30/20 Budgeting Rule - Complete Guide | ToolZoneX",
    description: "Learn how to manage your money effectively using the 50/30/20 budgeting rule.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@toolzonex",
  },
};

const budgetingRuleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The 50/30/20 Budgeting Rule - Complete Guide for Financial Success",
  "description": "Learn how to manage your money effectively using the 50/30/20 budgeting rule.",
  "url": `${SITE_URL}/blog/50-30-20-budgeting-rule`,
  "image": [`${SITE_URL}/og-image.jpg`],
  "datePublished": "2026-03-01",
  "dateModified": "2026-03-01",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(budgetingRuleSchema) }}
      />
      <BudgetingRule />
    </>
  );
}
