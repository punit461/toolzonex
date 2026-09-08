import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/ovulation-calculator",
    navName: "Ovulation Calculator",
    navDescription: "Estimate ovulation, fertile window & next period.",
    name: "Ovulation Calculator",
    description: "Estimate your ovulation date, fertile window, and next expected period based on your last period and average cycle length.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Ovulation Calculator - Fertile Window & Ovulation Date",
    seoDescription: "Free ovulation calculator to estimate your ovulation date, fertile window, and next expected period based on your last menstrual period and cycle length.",
    keywords: ["ovulation calculator", "fertile window calculator", "ovulation date calculator", "when am I ovulating", "fertility calculator", "period and ovulation calculator", "most fertile days calculator"],
    ogTitle: "Ovulation Calculator - Fertile Window & Ovulation Date | ToolZoneX",
    ogDescription: "Estimate your ovulation date, fertile window, and next expected period.",
    schemaName: "Ovulation Calculator",
    schemaDescription: "Estimate ovulation date, fertile window, and next expected period based on last period and cycle length.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is this ovulation calculator?", answer: "It's an estimate based on average cycle statistics, not a measurement of your actual hormone levels. This calculator is not a substitute for medical advice, and it is not a reliable method of contraception — actual ovulation timing varies from cycle to cycle and can be affected by stress, illness, travel, and many other factors. If you're trying to conceive or avoid pregnancy, talk to a healthcare provider and consider tracking methods like ovulation predictor kits or basal body temperature alongside this calculator." }, { question: "What is the fertile window?", answer: "The fertile window is the span of days in a cycle when pregnancy is possible — typically the 5 days before ovulation plus the day of ovulation itself, since sperm can survive in the body for several days while the egg is only viable for about 24 hours after release." }, { question: "What if my cycles are irregular?", answer: "This calculator assumes a consistent cycle length, so estimates will be less reliable if your cycles vary significantly month to month. In that case, tracking multiple cycles and using additional fertility signs — or speaking with a doctor — will give a more reliable picture." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
