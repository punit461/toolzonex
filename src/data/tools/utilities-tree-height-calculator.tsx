import HeightIcon from '@mui/icons-material/Height';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tree-height-calculator",
    navName: "Tree Height Calculator",
    navDescription: "Estimate tree height using the angle method.",
    name: "Tree Height Calculator",
    description: "Estimate a tree's height from the distance to its base, the angle of elevation to its top, and your eye height.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Tree Height Calculator - Clinometer Angle Method",
    seoDescription: "Free tree height calculator. Enter distance, angle of elevation, and eye height to estimate a tree's height.",
    keywords: ["tree height calculator", "how to measure tree height", "clinometer tree height calculator", "angle of elevation tree height", "estimate tree height"],
    ogTitle: "Tree Height Calculator - Clinometer Angle Method | ToolZoneX",
    ogDescription: "Estimate a tree's height from distance, angle of elevation, and eye height.",
    schemaName: "Tree Height Calculator",
    schemaDescription: "Estimate a tree's height from the distance to its base, the angle of elevation to its top, and your eye height.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How do I measure the angle of elevation?", answer: "A dedicated clinometer gives the most accurate reading, but most smartphones have a built-in level or angle-measuring app you can sight along toward the treetop instead." }, { question: "Why does eye height matter?", answer: "The angle you measure is from your eye level, not from the ground, so the triangle's calculated height only covers the vertical distance from your eyes up to the treetop. Adding your eye height back in accounts for the remaining distance from your eyes down to the ground." }, { question: "Does the ground need to be flat?", answer: "This method assumes the ground between you and the tree base is roughly level. On sloped terrain, the result will be somewhat inaccurate, and a more advanced surveying method accounting for the slope would be needed for precision." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
