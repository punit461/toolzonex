import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-glassmorphism-generator",
    navName: "CSS Glassmorphism Generator",
    navDescription: "Build a frosted-glass CSS effect with a live preview.",
    name: "CSS Glassmorphism Generator",
    description: "Generate frosted-glass glassmorphism CSS with adjustable blur, tint, border, and radius, plus a live preview.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Glassmorphism Generator - Frosted Glass CSS Builder",
    seoDescription: "Generate frosted-glass glassmorphism CSS with adjustable blur, tint, border, and radius, plus a live preview. Free online CSS generator.",
    keywords: ["css glassmorphism generator", "frosted glass css", "backdrop-filter generator", "glassmorphism css builder", "glass effect css"],
    ogTitle: "CSS Glassmorphism Generator - Frosted Glass CSS Builder | ToolZoneX",
    ogDescription: "Generate frosted-glass glassmorphism CSS with adjustable blur, tint, border, and radius.",
    schemaName: "CSS Glassmorphism Generator",
    schemaDescription: "Generate frosted-glass glassmorphism CSS with adjustable blur, tint, border, and radius, plus a live preview.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does the CSS include both backdrop-filter and -webkit-backdrop-filter?", answer: "The -webkit- prefixed version is required for Safari to apply the blur effect, so including both ensures the glass effect renders consistently across Chrome, Firefox, and Safari." }, { question: "Why isn't the blur showing on my element?", answer: "backdrop-filter only blurs whatever is visually behind the element, so it needs a background (an image, gradient, or other content) positioned underneath it — over a plain solid-color background, the effect can look identical to a simple semi-transparent box." }, { question: "Does glassmorphism work well for text-heavy content?", answer: "Use it sparingly for text-heavy areas — the translucent background can reduce contrast, so it's best paired with a subtle background and dark or light text chosen to keep good readability." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
