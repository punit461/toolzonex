import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/anniversary-countdown",
    navName: "Anniversary Countdown",
    navDescription: "Live countdown to a yearly anniversary.",
    name: "Anniversary Countdown - Live Timer",
    description: "Enter a recurring anniversary date and see a live countdown to its next occurrence, plus which anniversary number is coming up.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Anniversary Countdown - Live Timer to Your Anniversary",
    seoDescription: "Enter a recurring anniversary date and see a live countdown to its next occurrence, plus which anniversary number is coming up. Free and instant.",
    keywords: ["anniversary countdown", "days until anniversary", "wedding anniversary countdown", "anniversary timer"],
    ogTitle: "Anniversary Countdown - Live Timer | ToolZoneX",
    ogDescription: "Enter a recurring anniversary date and see a live countdown to its next occurrence.",
    schemaName: "Anniversary Countdown",
    schemaDescription: "Enter a recurring anniversary date and see a live countdown to its next occurrence, plus which anniversary number is coming up.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Do I have to enter a starting year?", answer: "No — the start year is optional. Without it, you still get a live countdown; with it, the tool also tells you which anniversary number is coming up." }, { question: "What happens if the date already passed this year?", answer: "The countdown automatically points to next year's occurrence of the date instead." }, { question: "Does the countdown update automatically?", answer: "Yes — it updates every second in real time without needing to click any button or refresh the page." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
