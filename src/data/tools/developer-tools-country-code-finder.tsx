import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/country-code-finder",
    navName: "Country Code Finder",
    navDescription: "Find ISO & calling codes by country.",
    name: "Country Code Finder",
    description: "Look up a country's ISO2 and ISO3 country codes and its international calling/dial code by searching its name.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "Country Code Finder - ISO & Calling Codes by Country",
    seoDescription: "Free country code finder. Search any country name to find its ISO2, ISO3, and international calling/dial code instantly.",
    keywords: ["country code finder", "iso country code lookup", "country calling code finder", "country dial code", "iso2 iso3 country codes"],
    ogTitle: "Country Code Finder - ISO & Calling Codes by Country | ToolZoneX",
    ogDescription: "Search a country name to find its ISO and calling codes.",
    schemaName: "Country Code Finder",
    schemaDescription: "Look up a country's ISO2 and ISO3 country codes and its international calling/dial code by searching its name.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What is the difference between ISO2 and ISO3 codes?", answer: "Both are standardized country codes from ISO 3166-1, just at different lengths — ISO2 (2 letters, like \"IN\") is common in web locales and domain suffixes, while ISO3 (3 letters, like \"IND\") is often used in international databases, sports federations, and some APIs that prefer a less ambiguous code." }, { question: "Why do some countries share a dial code?", answer: "Countries in the North American Numbering Plan (including the US and Canada) all share the +1 dial code and are distinguished by their area codes instead, rather than each having a unique country dial code." }, { question: "Does this include every country in the world?", answer: "This tool draws from a curated list of widely searched countries rather than the complete list of every country and territory. If a country you need isn't listed, check an official ISO 3166 reference for the complete list." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
