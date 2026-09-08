import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/decision-wheel-generator",
    navName: "Decision Wheel Generator",
    navDescription: "Spin a wheel to randomly pick from your options.",
    name: "Decision Wheel Generator - Random Spinning Wheel Picker",
    description: "Add your options, spin a colorful wheel, and let a truly random spin pick one for you — great for when you just want something decided.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DonutLargeIcon fontSize="large" color="primary"/>,
    seoTitle: "Decision Wheel Generator - Free Spinning Wheel Picker",
    seoDescription: "Free online decision wheel generator. Add your options, spin the wheel, and get a random pick — perfect for restaurants, games, and group decisions.",
    keywords: ["decision wheel generator", "spinning wheel picker", "random wheel spinner", "wheel of names", "random decision maker"],
    ogTitle: "Decision Wheel Generator - Free Spinning Wheel Picker | ToolZoneX",
    ogDescription: "Add your options, spin the wheel, and get a random pick instantly.",
    schemaName: "Decision Wheel Generator",
    schemaDescription: "Add your options, spin a colorful wheel, and let a truly random spin pick one for you.",
    applicationCategory: "GameApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Decision List Generator?", answer: "The Decision List Generator is an analytical tool — you weigh pros and cons by importance to see which side of a decision scores higher. This Decision Wheel Generator does the opposite: it's a fun, purely random picker for when your options are roughly equal and you just want something chosen for you, with no weighing or analysis involved." }, { question: "Is the spin actually random, or does it favor certain slices?", answer: "It's genuinely random — the winning option is chosen with Math.random() before the animation even starts, and the wheel's spin angle is calculated afterward purely to visually land on that already-chosen result. Every option has an equal chance regardless of its position on the wheel." }, { question: "Is there a limit to how many options I can add?", answer: "No hard limit — add as many as you need with the \"Add Option\" button, though very long lists make each slice's label harder to read on the wheel." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
