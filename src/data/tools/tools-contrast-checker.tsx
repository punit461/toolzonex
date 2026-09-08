import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/contrast-checker",
    navName: "Contrast Checker",
    navDescription: "Check WCAG color accessibility.",
    name: "Contrast Checker - WCAG Color Accessibility",
    description: "Check color contrast ratios for WCAG accessibility compliance instantly. Free online contrast checker.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "WCAG Contrast Checker - Color Accessibility Tester",
    seoDescription: "Free WCAG color contrast checker and tester. Check color contrast ratio for WCAG AA/AAA and web accessibility compliance instantly.",
    keywords: ["wcag color checker", "wcag color tester", "wcag contrast checker", "contrast checker", "check color contrast ratio", "color contrast ratio", "website color accessibility checker", "web accessibility color checker", "ada compliance contrast checker", "accessibility color check", "contrast checking", "contrast checker for accessibility", "accessibility calculator", "web design contrast"],
    ogTitle: "WCAG Contrast Checker - Color Accessibility Tester | ToolZoneX",
    ogDescription: "Check color contrast ratios for WCAG accessibility compliance instantly. Free online contrast checker.",
    schemaName: "WCAG Contrast Checker",
    schemaDescription: "Check color contrast ratios for WCAG accessibility compliance instantly.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: [{ question: "What is WCAG and why does contrast matter?", answer: "WCAG (Web Content Accessibility Guidelines) is the standard used to measure whether website color combinations are readable by people with low vision or color blindness. This tool calculates the WCAG contrast ratio between your text and background colors so you can check compliance before publishing." }, { question: "What contrast ratio do I need?", answer: "WCAG AA requires at least 4.5:1 for normal text (3:1 for large text). WCAG AAA, a stricter standard, requires 7:1 for normal text (4.5:1 for large text)." }, { question: "Is this an ADA compliance contrast checker?", answer: "The ADA itself doesn't specify a technical contrast formula, but WCAG AA (4.5:1 for normal text) is the standard most commonly used to demonstrate ADA-related web accessibility compliance in the US. Checking your contrast ratio against WCAG AA with this tool is a reasonable way to help meet that bar." }, { question: "How do I check color contrast ratio for accessibility?", answer: "Enter your text color and background color as hex codes above — the contrast ratio, along with WCAG AA and AAA pass/fail results for both normal and large text, calculates instantly." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
