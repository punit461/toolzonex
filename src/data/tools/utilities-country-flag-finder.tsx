import FlagIcon from '@mui/icons-material/Flag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/country-flag-finder",
    navName: "Country Flag Finder",
    navDescription: "Search a country to see its flag emoji.",
    name: "Country Flag Finder",
    description: "Search around 195 countries to instantly see their flag rendered as an emoji, computed from the ISO alpha-2 country code.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FlagIcon fontSize="large" color="primary"/>,
    seoTitle: "Country Flag Finder - Flag Emoji by Country Name",
    seoDescription: "Free country flag finder. Search any country name to instantly see its flag emoji, computed from its ISO country code.",
    keywords: ["country flag finder", "flag emoji finder", "country flag emoji lookup", "flag by country name", "find country flag"],
    ogTitle: "Country Flag Finder - Flag Emoji by Country Name | ToolZoneX",
    ogDescription: "Search a country name to see its flag emoji instantly.",
    schemaName: "Country Flag Finder",
    schemaDescription: "Search around 195 countries to instantly see their flag rendered as an emoji, computed from the ISO alpha-2 country code.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why might a flag show as two letters instead of an image on my device?", answer: "Flag emoji rendering depends on your operating system and font support. Most modern phones and browsers render them as full flag images, but some older systems or fonts may show the two Regional Indicator Symbol letters instead." }, { question: "Is this the same as a Flag Emoji Finder?", answer: "Yes — this tool covers both use cases in one place: searching by country name to see its flag, which is exactly what a dedicated flag emoji finder would do." }, { question: "Does this include every country and territory?", answer: "It covers roughly 195 widely-recognized countries rather than every dependent territory or micro-state, but it covers all UN member states plus a few commonly searched additional entries." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
