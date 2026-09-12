import AnimationIcon from '@mui/icons-material/Animation';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-animation-generator",
    navName: "CSS Animation Generator",
    navDescription: "Build CSS keyframe animations visually.",
    name: "CSS Animation Generator",
    description: "Build a CSS @keyframes animation from presets like fade, slide, spin, and bounce with a live preview. Free online CSS animation generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <AnimationIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Animation Generator - Build @keyframes Animations Online",
    seoDescription: "Free online CSS animation generator. Pick a preset — fade, slide, spin, or bounce — customize duration and timing, and copy ready-to-use @keyframes CSS.",
    keywords: ["css animation generator", "css keyframes generator", "css animation maker", "generate css animation", "keyframe animation css"],
    ogTitle: "CSS Animation Generator - Build @keyframes Animations Online | ToolZoneX",
    ogDescription: "Build a CSS @keyframes animation from presets with a live preview.",
    schemaName: "CSS Animation Generator",
    schemaDescription: "Build a CSS @keyframes animation from ready-made presets with a live preview.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why doesn't my animation restart when I change settings?", answer: "Some browsers won't replay a CSS animation just because its properties changed if it's already running the same keyframe name — click \"Replay Animation\" to force a fresh restart in the preview." }, { question: "Can I combine multiple keyframe effects?", answer: "Yes — copy this generator's output and add more properties inside the same @keyframes percentage steps (like combining opacity and transform together)." }, { question: "Is my data uploaded anywhere?", answer: "No — the CSS is generated and previewed entirely client-side in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
