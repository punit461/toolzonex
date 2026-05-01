import type { Metadata } from "next";
import BudgetingRule from "../../../pages/blogs/BudgetingRule";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "The 50/30/20 Budgeting Rule - Complete Guide for Financial Success",
  description: "Learn how to manage your money effectively using the 50/30/20 budgeting rule. A simple yet powerful framework for budgeting, saving, and achieving financial goals.",
  keywords: ["50/30/20 rule", "budgeting rule", "budgeting tips", "personal finance", "savings rule", "budget allocation", "financial planning"],
  alternates: { canonical: "/blog/50-30-20-budgeting-rule" },
  openGraph: {
    title: "The 50/30/20 Budgeting Rule - Complete Guide | ToolZoneX",
    description: "Learn how to manage your money effectively using the 50/30/20 budgeting rule.",
    url: `${SITE_URL}/blog/50-30-20-budgeting-rule`,
    type: "article",
  },
};

const budgetingRuleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The 50/30/20 Budgeting Rule - Complete Guide for Financial Success",
  "description": "Learn how to manage your money effectively using the 50/30/20 budgeting rule.",
  "url": `${SITE_URL}/blog/50-30-20-budgeting-rule`,
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "author": { "@type": "Organization", "name": "ToolZoneX" },
  "publisher": {
    "@type": "Organization",
    "name": "ToolZoneX",
    "logo": { "@type": "ImageObject", "url": `${SITE_URL}/toolzonex/logo.png` }
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
