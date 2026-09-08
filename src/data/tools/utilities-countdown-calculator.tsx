import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/countdown-calculator",
    navName: "Countdown Calculator",
    navDescription: "Live countdown to any date and time.",
    name: "Countdown Calculator - Live Countdown to Any Date",
    description: "Count down live to any target date and time, showing days, hours, minutes, and seconds remaining (or elapsed).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HourglassBottomIcon fontSize="large" color="primary"/>,
    seoTitle: "Countdown Calculator - Live Countdown to Any Date",
    seoDescription: "Free countdown calculator. Set any target date and time to see a live, auto-updating countdown of days, hours, minutes, and seconds remaining.",
    keywords: ["countdown calculator", "countdown timer", "days until calculator", "time until calculator", "event countdown"],
    ogTitle: "Countdown Calculator - Live Countdown to Any Date | ToolZoneX",
    ogDescription: "Set a target date and see a live countdown update every second.",
    schemaName: "Countdown Calculator",
    schemaDescription: "Live countdown to any target date and time, showing days, hours, minutes, and seconds remaining.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does the countdown keep updating automatically?", answer: "Yes — once you set a target date and time, the display refreshes every second on its own, with no need to click a button or reload the page." }, { question: "What happens if I pick a date in the past?", answer: "The calculator switches to showing elapsed time — how long ago that date and time occurred — instead of a countdown." }, { question: "Does this account for my local time zone?", answer: "Yes — the target date and time you enter, and the current time used for the countdown, are both based on your device's local time zone." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
