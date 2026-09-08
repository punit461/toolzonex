import NightlightIcon from '@mui/icons-material/Nightlight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/ideal-sleep-duration-calculator",
    navName: "Ideal Sleep Duration Calculator",
    navDescription: "Recommended sleep hours by age group.",
    name: "Ideal Sleep Duration Calculator",
    description: "Find the recommended range of total sleep hours per night based on your age group, from newborn through older adult.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <NightlightIcon fontSize="large" color="primary"/>,
    seoTitle: "Ideal Sleep Duration Calculator - Recommended Hours by Age",
    seoDescription: "Free ideal sleep duration calculator. Select your age group to see the recommended range of total sleep hours per night.",
    keywords: ["ideal sleep duration calculator", "how many hours of sleep by age", "recommended sleep hours calculator", "sleep needs by age calculator", "how much sleep do i need calculator"],
    ogTitle: "Ideal Sleep Duration Calculator - Recommended Hours by Age | ToolZoneX",
    ogDescription: "Find the recommended range of total sleep hours per night based on your age group.",
    schemaName: "Ideal Sleep Duration Calculator",
    schemaDescription: "Determine the recommended total sleep duration range for a selected age group based on published sleep guidelines.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Sleep Time Calculator?", answer: "The Sleep Time Calculator works out a specific bedtime or wake-up time based on 90-minute sleep cycles. This tool answers a completely different question — how many total hours of sleep you should be getting per night based on your age — without reference to any particular clock time." }, { question: "Why do sleep needs decrease with age?", answer: "Sleep needs are highest during infancy and childhood when the body and brain are developing rapidly, and gradually decrease through adolescence into adulthood, where needs stabilize before dipping slightly in older age." }, { question: "What if I regularly sleep less than the recommended range?", answer: "Occasional short sleep is normal, but consistently sleeping below the recommended range for your age group is linked to a range of health effects over time. If you struggle to get enough sleep regularly, it's worth discussing with a healthcare provider." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
