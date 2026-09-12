import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/color-contrast-checker",
    navName: "Color Contrast Checker",
    navDescription: "Check WCAG contrast ratios between colors.",
    name: "Color Contrast Checker",
    description: "Check the contrast ratio between two colors and see WCAG AA/AAA pass/fail for normal and large text. Free online color contrast checker.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "Color Contrast Checker - WCAG AAA/AA Contrast Ratio",
    seoDescription: "Free online color contrast checker. Enter two colors and instantly get the WCAG contrast ratio with AA/AAA pass/fail results for normal and large text.",
    keywords: ["color contrast checker", "contrast ratio checker", "wcag contrast checker", "wcag aa checker", "color contrast ratio", "accessible color checker"],
    ogTitle: "Color Contrast Checker - WCAG Contrast Ratio | ToolZoneX",
    ogDescription: "Check the contrast ratio between two colors and see WCAG AA/AAA pass/fail for normal and large text.",
    schemaName: "Color Contrast Checker",
    schemaDescription: "Check the contrast ratio between two colors and see WCAG AA/AAA pass/fail for normal and large text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
