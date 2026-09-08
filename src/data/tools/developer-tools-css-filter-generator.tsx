import TuneIcon from '@mui/icons-material/Tune';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-filter-generator",
    navName: "CSS Filter Generator",
    navDescription: "Build CSS filter effects with sliders.",
    name: "CSS Filter Generator",
    description: "Adjust sliders for blur, brightness, contrast, grayscale, and more to build CSS filter effects with a live preview. Free online CSS filter generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TuneIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Filter Generator - Build Blur, Brightness & Contrast Effects",
    seoDescription: "Free online CSS filter generator. Adjust blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, and sepia sliders with a live image preview.",
    keywords: ["css filter generator", "css filter effects", "image filter css", "css blur generator", "css grayscale generator"],
    ogTitle: "CSS Filter Generator - Build Blur, Brightness & Contrast Effects | ToolZoneX",
    ogDescription: "Adjust sliders to build a CSS filter value with a live preview.",
    schemaName: "CSS Filter Generator",
    schemaDescription: "Adjust sliders for blur, brightness, contrast, and more to build a CSS filter value.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Do these filters affect page performance?", answer: "CSS filters are GPU-accelerated in most browsers, but applying heavy blur to large images or many elements can still impact rendering performance — test on the actual target devices." }, { question: "Can I apply a filter to text or the whole page?", answer: "Yes — filter works on any element, not just images, including text, videos, and entire containers." }, { question: "Is my image uploaded anywhere?", answer: "This tool uses a built-in sample illustration for the live preview — the CSS itself is just generated client-side and nothing is uploaded to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
