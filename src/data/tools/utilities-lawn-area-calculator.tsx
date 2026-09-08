import YardIcon from '@mui/icons-material/Yard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/lawn-area-calculator",
    navName: "Lawn Area Calculator",
    navDescription: "Total area of a yard made of multiple shapes.",
    name: "Lawn Area Calculator",
    description: "Calculate the total area of an irregularly-shaped lawn by adding up multiple rectangle, circle, and triangle sections.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <YardIcon fontSize="large" color="primary"/>,
    seoTitle: "Lawn Area Calculator - Total Yard Size from Multiple Shapes",
    seoDescription: "Free lawn area calculator. Break your yard into rectangle, circle, and triangle sections to find the total lawn area in square feet, square yards, and acres.",
    keywords: ["lawn area calculator", "yard size calculator", "lawn square footage calculator", "irregular lawn area calculator", "how big is my lawn"],
    ogTitle: "Lawn Area Calculator - Total Yard Size | ToolZoneX",
    ogDescription: "Calculate the total area of an irregularly-shaped lawn from multiple sections.",
    schemaName: "Lawn Area Calculator",
    schemaDescription: "Calculate the total area of an irregularly-shaped lawn by summing rectangle, circle, and triangle sections.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What if part of my lawn is an odd shape that isn't listed?", answer: "Approximate it with the closest simple shape available, or split it into two or three sections that together resemble the actual area — for most residential yards, a combination of rectangles, circles, and triangles gets you close enough for seed, fertilizer, or mulch estimates." }, { question: "Should I subtract driveways, patios, or garden beds?", answer: "Yes — this calculator adds up only the sections you enter, so simply don't include paved or planted areas as lawn sections, or add them as a separate negative check against your total property size." }, { question: "How do I convert the result to acres?", answer: "Divide the total square footage by 43,560 (the number of square feet in an acre). The result box below shows this conversion automatically alongside the square footage total." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
