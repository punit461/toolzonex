import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-clip-path-generator",
    navName: "CSS Clip-Path Generator",
    navDescription: "Create custom shapes with clip-path visually.",
    name: "CSS Clip-Path Generator",
    description: "Build a CSS clip-path shape — circle, ellipse, triangle, pentagon, hexagon, or inset — with a live preview. Free online CSS clip-path generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <AspectRatioIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Clip-Path Generator - Create Custom Shapes Online",
    seoDescription: "Free online CSS clip-path generator. Choose a shape and adjust its parameters to generate ready-to-use clip-path CSS, with a live preview.",
    keywords: ["css clip-path generator", "clip path generator", "css shape generator", "clip-path maker", "css polygon generator"],
    ogTitle: "CSS Clip-Path Generator - Create Custom Shapes Online | ToolZoneX",
    ogDescription: "Build a CSS clip-path shape with a live preview and one-click copy.",
    schemaName: "CSS Clip-Path Generator",
    schemaDescription: "Build a CSS clip-path shape with a live preview on a sample box.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does clip-path affect the element's clickable area?", answer: "In most modern browsers, yes — clicks outside the visible clipped shape but inside the original box are not registered, so a clip-path shape is also generally its interactive hit area." }, { question: "Is clip-path animatable?", answer: "Yes, when both the starting and ending values use the same clip-path function (like two polygon() values with the same number of points) — browsers can smoothly transition between them." }, { question: "Is browser support good for clip-path?", answer: "Yes — clip-path with basic shapes is supported in all modern browsers, though very old browsers may need a -webkit- prefix or lack support entirely." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
