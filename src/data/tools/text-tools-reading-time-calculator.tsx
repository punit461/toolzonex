import TimerIcon from '@mui/icons-material/Timer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/reading-time-calculator",
    navName: "Reading Time Calculator",
    navDescription: "Estimate reading time from word count.",
    name: "Reading Time Calculator",
    description: "Estimate how long a piece of text takes to read based on word count and an adjustable reading speed.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TimerIcon fontSize="large" color="primary"/>,
    seoTitle: "Reading Time Calculator - Estimate Read Time Online",
    seoDescription: "Estimate how long a piece of text takes to read based on word count and an adjustable words-per-minute reading speed. Free and instant.",
    keywords: ["reading time calculator", "estimated reading time", "words per minute calculator", "read time estimator", "how long to read"],
    ogTitle: "Reading Time Calculator - Estimate Read Time Online | ToolZoneX",
    ogDescription: "Estimate how long a piece of text takes to read based on word count and reading speed.",
    schemaName: "Reading Time Calculator",
    schemaDescription: "Estimate how long a piece of text takes to read based on word count and an adjustable reading speed.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What's a good words-per-minute value to use?", answer: "225 words per minute is a commonly used average for adult silent reading and works well for general blog content. Use a lower value like 150-180 WPM for technical or academic material, and a higher value for skimmable, casual content." }, { question: "Does this update as I type?", answer: "Yes — the word count and estimated reading time recalculate instantly as you type, paste text, or adjust the reading speed slider." }, { question: "Is this the same as calculating speaking time?", answer: "No — reading time here assumes silent reading speed. Spoken delivery is typically slower (roughly 120-150 words per minute), so a script's speaking time will usually be longer than its silent reading time." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
