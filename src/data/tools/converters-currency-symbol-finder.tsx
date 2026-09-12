import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/currency-symbol-finder",
    navName: "Currency Symbol Finder",
    navDescription: "Find a currency's symbol by code, symbol, or name.",
    name: "Currency Symbol Finder",
    description: "Search around 75 world currencies by 3-letter code, symbol, or full name to find the matching currency symbol and name.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Currency Symbol Finder - Look Up World Currency Symbols",
    seoDescription: "Free online currency symbol finder. Search by currency code, symbol, or name to find matching world currencies instantly.",
    keywords: ["currency symbol finder", "currency symbol lookup", "world currency symbols", "find currency symbol", "currency code to symbol"],
    ogTitle: "Currency Symbol Finder - Look Up World Currency Symbols | ToolZoneX",
    ogDescription: "Search by code, symbol, or name to find matching world currencies.",
    schemaName: "Currency Symbol Finder",
    schemaDescription: "Search around 75 world currencies by 3-letter code, symbol, or full name to find the matching currency symbol and name.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why do multiple currencies share the same symbol?", answer: "Symbols like \"$\" and \"£\" are used by many different countries' currencies historically or by convention — the 3-letter ISO code (like USD vs. AUD) is what actually distinguishes them precisely." }, { question: "How many currencies are included?", answer: "Around 75 of the world's most commonly referenced currencies, covering all major and many regional currencies." }, { question: "Can I search using a partial currency name?", answer: "Yes — typing part of a currency's name, like \"franc\" or \"dinar\", returns every currency whose name contains that text." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
