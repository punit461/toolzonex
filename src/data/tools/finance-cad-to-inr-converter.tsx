import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cad-to-inr-converter",
    navName: "CAD to INR Converter",
    navDescription: "Convert Canadian Dollars to Indian Rupees with live rates.",
    name: "CAD to INR Converter (Canadian Dollar to Rupee)",
    description: "Convert Canadian Dollar (CAD) to Indian Rupee (INR) instantly using live exchange rates — also works as an INR to CAD converter with one tap.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "CAD to INR Converter - Canadian Dollar to Rupee",
    seoDescription: "Free CAD to INR converter with live exchange rates. Convert Canadian Dollar (CAD) to Indian Rupee (INR) or INR to CAD instantly — updated daily.",
    keywords: ["cad to inr", "canadian dollar to inr", "inr to cad", "cad inr converter", "1 cad to inr", "canadian dollar to rupee"],
    ogTitle: "CAD to INR Converter - Canadian Dollar to Rupee | ToolZoneX",
    ogDescription: "Convert Canadian Dollar (CAD) to Indian Rupee (INR) instantly using live exchange rates — also works as an INR to CAD converter.",
    schemaName: "CAD to INR Converter",
    schemaDescription: "Convert Canadian Dollar (CAD) to Indian Rupee (INR) using live, daily-updated exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is 1 Canadian dollar in Indian rupees?", answer: "One Canadian Dollar is typically worth somewhere in the range of ₹58–₹63, depending on current market conditions. Use the calculator above for today's exact live rate." }, { question: "How much is C$100 in INR?", answer: "At an example rate of ₹61 per C$1, C$100 converts to about ₹6,100. Enter 100 in the calculator above to see today's exact figure." }, { question: "How current is the CAD to INR exchange rate?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day. They're accurate for estimates, but banks and money-transfer services apply their own rate plus a fee." }, { question: "Can I convert INR to CAD on this page too?", answer: "Yes — tap the swap icon to flip the direction to INR to CAD." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
