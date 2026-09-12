import TvIcon from '@mui/icons-material/Tv';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tv-electricity-cost-calculator",
    navName: "TV Electricity Cost Calculator",
    navDescription: "TV running cost by size/type & hours watched.",
    name: "TV Electricity Cost Calculator",
    description: "Estimate daily, monthly, and annual TV electricity cost from wattage (or a screen-size/type preset), hours watched per day, and electricity rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TvIcon fontSize="large" color="primary"/>,
    seoTitle: "TV Electricity Cost Calculator - Daily, Monthly & Annual",
    seoDescription: "Free TV electricity cost calculator. Enter TV wattage or pick a size preset, hours watched per day, and electricity rate to estimate running cost.",
    keywords: ["tv electricity cost calculator", "how much electricity does a tv use", "tv running cost calculator", "tv power consumption calculator", "tv energy cost calculator"],
    ogTitle: "TV Electricity Cost Calculator - Daily, Monthly & Annual | ToolZoneX",
    ogDescription: "Estimate TV electricity cost from wattage, hours watched per day, and electricity rate.",
    schemaName: "TV Electricity Cost Calculator",
    schemaDescription: "Estimate TV electricity cost as wattage converted to kWh times hours watched per day times electricity rate, shown daily, monthly, and annually.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How accurate are the preset wattage figures?", answer: "They're illustrative typical ranges for common screen sizes and panel types, not a specific model's exact rating. For the most accurate result, check your TV's rated power consumption on its label, spec sheet, or an Energy Guide sticker and enter that as a custom wattage." }, { question: "Why does OLED sometimes use more power than LED at a similar size?", answer: "OLED pixels emit their own light individually, and power draw scales with how bright and colorful the content is — bright scenes can draw noticeably more power than dark ones, whereas LED-backlit LCD TVs draw more consistently regardless of content brightness." }, { question: "Does standby power matter?", answer: "Modern TVs typically draw only a small amount of standby power when off, which adds a modest amount to an annual total if left plugged in constantly — this calculator focuses on active viewing time, which is normally the larger share of total cost." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
