import type { ReactNode } from 'react';

/**
 * Single source of truth for every tool's identity data -- name, description,
 * route, category, icon, SEO metadata, and JSON-LD fields. Generated from the
 * codebase's existing page.tsx / CalculatorShell / toolCategories.tsx content
 * (phase 4 of the refactor report) -- see to-do/refactor-report.md.
 *
 * navName/navDescription and name/description are deliberately kept separate:
 * nav/homepage card text (toolCategories' old source) and on-page text
 * (CalculatorShell's old source) already disagreed for most tools before this
 * migration, and this registry preserves that pre-existing text exactly
 * rather than silently reconciling it. Same reasoning for navCategory vs
 * shellCategory: nav grouping (13 labels) and CalculatorShell's
 * breadcrumb/related-tools grouping (coarser) already disagreed for ~96
 * tools, and are kept as two separate fields rather than unified.
 *
 * schemaName/schemaDescription preserve the page's WebApplication JSON-LD
 * name/description exactly as they were (which also frequently differ from
 * both of the above) -- see the same rationale.
 */
export interface ToolRegistryEntry {
    route: string;
    navName: string;
    navDescription: string;
    name: string;
    description: string;
    navCategory: "Finance" | "Paycheck Calculators" | "Health" | "Time & Productivity" | "Utilities" | "Screens" | "Tools" | "PDF Tools" | "Text Tools" | "Generators" | "Converters" | "Developer Tools" | "AI";
    shellCategory: "Finance" | "Health" | "Utilities" | "Tools" | "Text Tools" | "Generators" | "Converters" | "Developer Tools" | "AI";
    icon: ReactNode;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    /** Absent only for the 3 hub/listing pages, which don't render their own WebApplication JSON-LD. */
    schemaName?: string;
    schemaDescription?: string;
    applicationCategory?: string;
    currency?: "INR" | "USD" | "GBP" | "AUD";
    faqs?: {
        question: string;
        answer: string;
    }[];
    /** Rare passthrough for non-standard JSON-LD fields, spread into the WebApplication schema (currently only emi-calculator's `calculateCost`). */
    extraSchemaFields?: Record<string, unknown>;
    /** Hub/listing pages (pdf-tools, screen-test, paycheck-calculator) that don't render their own WebApplication JSON-LD. */
    isHub: boolean;
    /**
     * Keeps the page fully live and working, but tells Google not to index it
     * (`robots: noindex, follow`) and excludes it from sitemap.xml.
     *
     * Set on 2026-09-12 across ~1,240 tools after a site-level ranking collapse:
     * the site went from 173 pages to 1,399 in six weeks and earned 35 clicks on
     * 43,717 impressions (0.08% CTR) over three months, which fits Google's
     * "scaled content abuse" profile. Only pages with proven demand (a click or
     * >=100 impressions in Search Console), structural pages, and flagship
     * high-volume tools stay indexed.
     *
     * This is a dial, not a deletion — flip a page back to indexed as soon as
     * keyword research shows real demand for it. `follow` is kept so internal
     * link equity still flows through these pages.
     */
    noindex?: boolean;
}
