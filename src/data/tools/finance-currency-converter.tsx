import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/currency-converter",
    navName: "Currency Converter",
    navDescription: "Convert major currencies using live exchange rates.",
    name: "Currency Converter",
    description: "Convert between major world currencies using live, daily-updated exchange rates.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Currency Converter - Live Exchange Rates",
    seoDescription: "Free currency converter with live, daily-updated exchange rates for USD, EUR, GBP, INR, JPY, and other major world currencies.",
    keywords: ["currency converter", "exchange rate calculator", "USD to INR converter", "live currency converter", "foreign exchange calculator", "forex converter"],
    ogTitle: "Currency Converter - Live Exchange Rates | ToolZoneX",
    ogDescription: "Convert between major world currencies using live, daily-updated exchange rates.",
    schemaName: "Currency Converter",
    schemaDescription: "Convert between major world currencies using live exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How current are these exchange rates?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day around 16:00 CET. They're suitable for estimates, but banks and card networks apply their own rates plus a markup or fee for actual currency conversion." }, { question: "Why did the conversion fail to load?", answer: "The live rate lookup needs an internet connection to reach the exchange-rate data source. If you're offline or the service is temporarily unavailable, you'll see an error message instead of a result — try again once you're back online." }, { question: "Why isn't every world currency available?", answer: "This converter covers major, widely-traded currencies supported by the underlying rate data source. A small number of less commonly traded currencies aren't included." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
