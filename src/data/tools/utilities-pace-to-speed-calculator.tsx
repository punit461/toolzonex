import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pace-to-speed-calculator",
    navName: "Pace to Speed Calculator",
    navDescription: "Convert running/walking pace to speed and back.",
    name: "Pace to Speed Calculator - Convert Pace and Speed",
    description: "Convert running or walking pace (minutes per mile/km) to speed (mph/km/h), or convert speed back to pace.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DirectionsRunIcon fontSize="large" color="primary"/>,
    seoTitle: "Pace to Speed Calculator - Convert Pace and Speed",
    seoDescription: "Free pace to speed calculator. Convert running or walking pace to mph/km-h, or convert speed to pace, for mile or kilometer distances.",
    keywords: ["pace to speed calculator", "pace calculator running", "speed to pace calculator", "min per mile to mph", "running pace converter"],
    ogTitle: "Pace to Speed Calculator | ToolZoneX",
    ogDescription: "Convert between running pace and speed instantly.",
    schemaName: "Pace to Speed Calculator",
    schemaDescription: "Convert running or walking pace (minutes per mile/km) to speed (mph/km/h), or convert speed back to pace.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is pace different from speed?", answer: "Pace expresses how long it takes to cover one unit of distance (like 8 minutes per mile), while speed expresses how much distance is covered in one unit of time (like 7.5 miles per hour). They're inversely related — a faster pace (smaller number) means a higher speed, and vice versa." }, { question: "Does it matter whether I use miles or kilometers?", answer: "The math is identical either way — only the label changes. Just make sure the pace and speed you're comparing use the same distance unit, since a mile pace and a kilometer pace aren't directly comparable without converting." }, { question: "What if my seconds value is 60 or higher?", answer: "Enter seconds between 0 and 59 and carry any extra time into the minutes field instead — for example, enter a pace of 8 minutes 75 seconds as 9 minutes 15 seconds." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
