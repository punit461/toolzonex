import ContrastIcon from '@mui/icons-material/Contrast';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/contrast-color-finder",
    navName: "Contrast Color Finder",
    navDescription: "Find the best text color for a background.",
    name: "Contrast Color Finder - Black or White Text?",
    description: "Enter a background color and instantly see whether black or white text has better WCAG contrast, with exact ratios and AA/AAA pass/fail badges.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ContrastIcon fontSize="large" color="primary"/>,
    seoTitle: "Contrast Color Finder - Black or White Text? Free WCAG Tool",
    seoDescription: "Enter any background color and find out whether black or white text reads better, with exact WCAG contrast ratios and AA/AAA pass/fail badges. Free online tool.",
    keywords: ["contrast color finder", "black or white text checker", "wcag contrast checker", "text contrast ratio", "accessible text color finder"],
    ogTitle: "Contrast Color Finder - Black or White Text? | ToolZoneX",
    ogDescription: "Find out whether black or white text has better contrast against your background color.",
    schemaName: "Contrast Color Finder",
    schemaDescription: "Enter a background color and instantly see whether black or white text has better WCAG contrast, with exact ratios and AA/AAA pass/fail badges.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What is the WCAG contrast ratio formula?", answer: "WCAG defines contrast ratio as (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color. Relative luminance is calculated from the linearized (gamma-corrected) sRGB red, green, and blue channels, weighted 0.2126, 0.7152, and 0.0722 respectively, reflecting how the human eye perceives each color's brightness." }, { question: "What's the difference between AA and AAA?", answer: "WCAG AA is the standard accessibility bar and requires a contrast ratio of at least 4.5:1 for normal body text. WCAG AAA is the stricter, enhanced level and requires at least 7:1. Large text (roughly 18pt or 14pt bold and above) has lower thresholds under both levels." }, { question: "Is my color data uploaded anywhere?", answer: "No — every calculation happens entirely client-side in your browser. Nothing you enter is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
