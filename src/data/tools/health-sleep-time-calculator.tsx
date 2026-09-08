import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/sleep-time-calculator",
    navName: "Sleep Time Calculator",
    navDescription: "Calculate 90-min sleep cycles.",
    name: "Sleep Time Calculator",
    description: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Sleep Time Calculator - Sleep Cycle & Bedtime Calculator",
    seoDescription: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized.",
    keywords: ["sleep time calculator", "sleep cycle calculator", "bedtime calculator", "bed time calculator", "when to sleep", "wake up time", "sleep clock calculator", "sleep calculator time", "sleeping hours calculator", "how many hours of sleep", "hours of sleep calculator"],
    ogTitle: "Sleep Time Calculator - Sleep Cycle & Bedtime Calculator | ToolZoneX",
    ogDescription: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles.",
    schemaName: "Sleep Time Calculator",
    schemaDescription: "Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Why 90-minute cycles?", answer: "A full sleep cycle (light sleep, deep sleep, REM) averages about 90 minutes. Waking up at the end of a cycle, rather than in the middle of deep sleep, generally feels less groggy." }, { question: "How many hours of sleep is 9pm to 5am?", answer: "Sleeping from 9:00 PM to 5:00 AM is 8 hours of sleep." }, { question: "If I sleep at 10 and wake up at 5, how many hours of sleep is that?", answer: "Sleeping from 10:00 PM to 5:00 AM is 7 hours of sleep." }, { question: "If I sleep at 12 and wake up at 8, how many hours of sleep is that?", answer: "Sleeping from 12:00 AM (midnight) to 8:00 AM is 8 hours of sleep." }, { question: "How many hours of sleep is 10 to 7?", answer: "Sleeping from 10:00 PM to 7:00 AM is 9 hours of sleep." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
