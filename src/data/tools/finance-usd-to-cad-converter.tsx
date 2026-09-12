import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/usd-to-cad-converter",
    navName: "USD to CAD Converter",
    navDescription: "Convert US Dollars to Canadian Dollars with live rates.",
    name: "USD to CAD Converter (US Dollar to Canadian Dollar)",
    description: "Convert US Dollar (USD) to Canadian Dollar (CAD) instantly using live exchange rates — also works as a CAD to USD converter with one tap.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "USD to CAD Converter - US Dollar to Canadian Dollar",
    seoDescription: "Free USD to CAD converter with live exchange rates. Convert US Dollar (USD) to Canadian Dollar (CAD) or CAD to USD instantly — updated daily.",
    keywords: ["usd to cad", "us dollar to canadian dollar", "cad to usd", "usd cad converter", "1 usd to cad", "dollar to cad"],
    ogTitle: "USD to CAD Converter - US Dollar to Canadian Dollar | ToolZoneX",
    ogDescription: "Convert US Dollar (USD) to Canadian Dollar (CAD) instantly using live exchange rates — also works as a CAD to USD converter.",
    schemaName: "USD to CAD Converter",
    schemaDescription: "Convert US Dollar (USD) to Canadian Dollar (CAD) using live, daily-updated exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is 1 US dollar in Canadian dollars?", answer: "One US Dollar is typically worth somewhere in the range of C$1.30–C$1.45, depending on current market conditions. Use the calculator above for today's exact live rate." }, { question: "How much is $100 in CAD?", answer: "At an example rate of C$1.38 per $1, $100 converts to about C$138. Enter 100 in the calculator above to see today's exact figure." }, { question: "How current is the USD to CAD exchange rate?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day. They're accurate for estimates, but banks and money-transfer services apply their own rate plus a fee." }, { question: "Can I convert CAD to USD on this page too?", answer: "Yes — tap the swap icon to flip the direction to CAD to USD." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
