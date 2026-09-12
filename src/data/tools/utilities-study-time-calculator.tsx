import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/study-time-calculator",
    navName: "Study Time Calculator",
    navDescription: "Calculate recommended daily study hours.",
    name: "Study Time Calculator",
    description: "Calculate recommended daily study hours from total pages to study, your reading pace, and days remaining until your exam.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "Study Time Calculator - How Many Hours to Study Per Day",
    seoDescription: "Free study time calculator. Enter total pages, reading pace, and days until your exam to calculate recommended daily study hours.",
    keywords: ["study time calculator", "how many hours should i study", "study schedule calculator", "study plan calculator", "exam study calculator"],
    ogTitle: "Study Time Calculator - How Many Hours to Study Per Day | ToolZoneX",
    ogDescription: "Calculate recommended daily study hours before your exam.",
    schemaName: "Study Time Calculator",
    schemaDescription: "Calculate recommended daily study hours from total pages to study, your reading pace, and days remaining until your exam.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What if the recommended daily hours feels unrealistic?", answer: "If the calculator suggests more hours per day than you can realistically manage, consider starting earlier if possible, cutting the material down to the most essential topics, or accepting a lighter pass over lower-priority sections rather than trying to cram everything in equally." }, { question: "How do I find my own reading pace?", answer: "Time yourself reading a sample chapter or a set number of pages at a normal, focused pace (not skimming), then divide the pages read by the time taken in hours. Technical or dense material is usually read more slowly than light material, so measure your pace on material similar to what you'll actually be studying." }, { question: "Should I study every day until the exam?", answer: "This calculator assumes an even daily pace, but many students prefer front-loading harder material earlier and leaving lighter review or practice tests for the final days. Use the total hours figure as your overall budget and distribute it across days however fits your study style best." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
