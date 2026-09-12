import ContrastIcon from '@mui/icons-material/Contrast';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-neumorphism-generator",
    navName: "CSS Neumorphism Generator",
    navDescription: "Build a soft-UI CSS box-shadow with a live preview.",
    name: "CSS Neumorphism Generator",
    description: "Generate soft-UI neumorphism CSS box-shadows with adjustable distance, blur, and intensity, plus a live preview.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ContrastIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Neumorphism Generator - Soft UI Box-Shadow Builder",
    seoDescription: "Generate soft-UI neumorphism CSS box-shadows with adjustable distance, blur, and intensity, plus a live preview. Free online CSS generator.",
    keywords: ["css neumorphism generator", "soft ui generator", "neumorphic css builder", "box-shadow neumorphism", "neumorphism css"],
    ogTitle: "CSS Neumorphism Generator - Soft UI Box-Shadow Builder | ToolZoneX",
    ogDescription: "Generate soft-UI neumorphism CSS box-shadows with adjustable distance, blur, and intensity.",
    schemaName: "CSS Neumorphism Generator",
    schemaDescription: "Generate soft-UI neumorphism CSS box-shadows with adjustable distance, blur, and intensity, plus a live preview.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why do both shadows need to match the background color?", answer: "Neumorphism works by shading the same base color lighter and darker rather than using a contrasting shadow color, which is what makes the element look like it's carved from the same material as its background instead of floating above it." }, { question: "Why does my neumorphic element look flat or low-contrast?", answer: "Neumorphism relies on subtle brightness differences, so it can naturally read as low-contrast — this is by design, but it means text and icons inside a neumorphic element need extra care to stay accessible and legible." }, { question: "Can I make an element look pressed in instead of raised?", answer: "Yes — swap the technique to use inset shadows (placing the dark shadow on the same side as the light one is flipped) to create a pressed-in, concave look instead of a raised, convex one." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
