import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-triangle-generator",
    navName: "CSS Triangle Generator",
    navDescription: "Generate pure-CSS triangles.",
    name: "CSS Triangle Generator",
    description: "Generate a pure-CSS triangle in any direction, size, and color using the zero-width-border trick, with copyable CSS.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Triangle Generator - Free Online Pure-CSS Triangle Maker",
    seoDescription: "Generate a pure-CSS triangle in any direction, size, and color using the border trick — copy the ready-to-use CSS instantly. Free online tool.",
    keywords: ["css triangle generator", "css triangle maker", "pure css triangle", "css arrow generator", "border triangle css"],
    ogTitle: "CSS Triangle Generator - Free Online Pure-CSS Triangle Maker | ToolZoneX",
    ogDescription: "Generate a pure-CSS triangle in any direction, size, and color.",
    schemaName: "CSS Triangle Generator",
    schemaDescription: "Generate a pure-CSS triangle in any direction, size, and color using the zero-width-border trick, with copyable CSS.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Can I make a triangle that isn't equilateral?", answer: "Yes — this generator uses equal border widths for a symmetric triangle, but you can manually edit the copied CSS and set different pixel values on the two transparent border sides to skew the shape." }, { question: "Does this work in all browsers?", answer: "Yes — the border-based triangle trick is supported in every modern browser and has been for a very long time, since it relies on basic CSS border rendering rather than any newer feature." }, { question: "Is my data uploaded anywhere?", answer: "No — the preview and CSS are generated entirely client-side in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
