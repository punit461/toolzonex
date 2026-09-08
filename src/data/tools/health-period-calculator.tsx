import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/period-calculator",
    navName: "Period Calculator",
    navDescription: "Predict your next period, cycle phase & fertile window.",
    name: "Period Calculator",
    description: "Predict your next period date, current cycle phase, and fertile window from your last period date and average cycle length.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Period Calculator - Predict Your Next Period",
    seoDescription: "Free period calculator to predict your next period date, current cycle day and phase, and fertile window based on your last period and cycle length.",
    keywords: ["period calculator", "period tracker", "menstrual cycle calculator", "next period calculator", "when is my next period", "period date calculator"],
    ogTitle: "Period Calculator - Predict Your Next Period | ToolZoneX",
    ogDescription: "Predict your next period date, cycle phase, and fertile window.",
    schemaName: "Period Calculator",
    schemaDescription: "Predict next period date, current cycle phase, and fertile window from last period date and cycle length.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is this period calculator?", answer: "It's an estimate based on your average cycle length, not a measurement of your actual hormones. Cycle length naturally varies month to month due to stress, illness, travel, and other factors, so treat the predicted dates as a helpful range rather than an exact schedule. This tool is not a substitute for medical advice or a reliable method of contraception." }, { question: "What are the four phases of the menstrual cycle?", answer: "The menstrual phase is your period itself. The follicular phase runs from the end of your period until ovulation. Ovulation is the release of an egg, roughly midway through the cycle. The luteal phase follows ovulation until your next period begins." }, { question: "How is this different from the Ovulation Calculator?", answer: "This tool is built around predicting your next period date and current cycle phase, with ovulation shown as a secondary estimate. If fertility planning is your main goal, the dedicated Ovulation Calculator leads with the fertile window and ovulation date instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
