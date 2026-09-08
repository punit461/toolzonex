import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/usd-to-aud-converter",
    navName: "USD to AUD Converter",
    navDescription: "Convert US Dollars to Australian Dollars with live rates.",
    name: "USD to AUD Converter (US Dollar to Australian Dollar)",
    description: "Convert US Dollar (USD) to Australian Dollar (AUD) instantly using live exchange rates — also works as an AUD to USD converter with one tap.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "USD to AUD Converter - US Dollar to Australian Dollar",
    seoDescription: "Free USD to AUD converter with live exchange rates. Convert US Dollar (USD) to Australian Dollar (AUD) or AUD to USD instantly — updated daily.",
    keywords: ["usd to aud", "us dollar to australian dollar", "aud to usd", "usd aud converter", "1 usd to aud", "dollar to aud"],
    ogTitle: "USD to AUD Converter - US Dollar to Australian Dollar | ToolZoneX",
    ogDescription: "Convert US Dollar (USD) to Australian Dollar (AUD) instantly using live exchange rates — also works as an AUD to USD converter.",
    schemaName: "USD to AUD Converter",
    schemaDescription: "Convert US Dollar (USD) to Australian Dollar (AUD) using live, daily-updated exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is 1 US dollar in Australian dollars?", answer: "One US Dollar is typically worth somewhere in the range of A$1.45–A$1.60, depending on current market conditions. Use the calculator above for today's exact live rate." }, { question: "How much is $100 in AUD?", answer: "At an example rate of A$1.52 per $1, $100 converts to about A$152. Enter 100 in the calculator above to see today's exact figure." }, { question: "How current is the USD to AUD exchange rate?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day. They're accurate for estimates, but banks and money-transfer services apply their own rate plus a fee." }, { question: "Can I convert AUD to USD on this page too?", answer: "Yes — tap the swap icon to flip the direction to AUD to USD." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
