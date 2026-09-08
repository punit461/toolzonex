import DarkModeIcon from '@mui/icons-material/DarkMode';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/solar-eclipse-countdown",
    navName: "Solar Eclipse Countdown",
    navDescription: "Live countdown to the next total solar eclipse.",
    name: "Solar Eclipse Countdown 2027",
    description: "A live countdown to the next total solar eclipse on August 2, 2027 — the longest total solar eclipse over land this century.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DarkModeIcon fontSize="large" color="primary"/>,
    seoTitle: "Solar Eclipse Countdown - Next Total Solar Eclipse 2027",
    seoDescription: "Live countdown to the next total solar eclipse on August 2, 2027. See exactly how many days, hours, minutes, and seconds remain, plus the eclipse's path of totality.",
    keywords: ["solar eclipse countdown", "eclipse 2026", "eclipse 2027", "next solar eclipse", "total solar eclipse 2027", "when is the next eclipse"],
    ogTitle: "Solar Eclipse Countdown - Next Total Solar Eclipse 2027 | ToolZoneX",
    ogDescription: "A live countdown to the next total solar eclipse on August 2, 2027 — the longest total solar eclipse over land this century.",
    schemaName: "Solar Eclipse Countdown",
    schemaDescription: "A live countdown to the next total solar eclipse on August 2, 2027.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "When is the next solar eclipse?", answer: "The next total solar eclipse is on August 2, 2027. An earlier annular solar eclipse occurs on February 6, 2027, though it's visible from a much smaller, more remote area." }, { question: "Why is the August 2027 eclipse called the 'eclipse of the century'?", answer: "At up to 6 minutes 23 seconds, it's the longest total solar eclipse over land anywhere in the 21st century — a duration not matched again until 2114." }, { question: "Will I be able to see it from where I live?", answer: "Only locations within the path of totality (southern Spain through the Middle East) will see a total eclipse; much of Europe, Africa, and Asia will see a partial eclipse instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
