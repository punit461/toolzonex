import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/holiday-countdown",
    navName: "Holiday Countdown",
    navDescription: "Live countdown to a major holiday.",
    name: "Holiday Countdown - Live Timer",
    description: "Choose a major holiday from Christmas to Diwali and see a live countdown to its next occurrence, updating every second.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CardGiftcardIcon fontSize="large" color="primary"/>,
    seoTitle: "Holiday Countdown - Live Timer to Christmas, Diwali & More",
    seoDescription: "Free holiday countdown. Pick a holiday like Christmas, New Year, Diwali, Thanksgiving, Halloween, or Valentine's Day and see a live countdown timer.",
    keywords: ["holiday countdown", "days until christmas", "days until diwali", "holiday countdown timer", "days until thanksgiving"],
    ogTitle: "Holiday Countdown - Live Timer | ToolZoneX",
    ogDescription: "See a live countdown to your chosen holiday's next occurrence.",
    schemaName: "Holiday Countdown - Live Timer",
    schemaDescription: "Choose a major holiday from Christmas to Diwali and see a live countdown to its next occurrence, updating every second.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Anniversary Countdown?", answer: "The Anniversary Countdown is for a personal recurring date you enter yourself, like a wedding anniversary. This tool instead offers a dropdown of common major holidays with their dates already built in, so there's nothing to enter beyond picking one from the list." }, { question: "Why does Diwali's date change every year?", answer: "Diwali is set by the Hindu lunisolar calendar, tied to the new moon of the month of Kartik, which doesn't align to a fixed Gregorian-calendar date the way solar-calendar holidays like Christmas do. That's why this tool looks up known upcoming Diwali dates rather than calculating from a month/day formula." }, { question: "Does the countdown update automatically?", answer: "Yes — it updates every second in real time without needing to click any button or refresh the page." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
