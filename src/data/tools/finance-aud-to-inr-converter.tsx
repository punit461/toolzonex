import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/aud-to-inr-converter",
    navName: "AUD to INR Converter",
    navDescription: "Convert Australian Dollars to Indian Rupees with live rates.",
    name: "AUD to INR Converter (Australian Dollar to Rupee)",
    description: "Convert Australian Dollar (AUD) to Indian Rupee (INR) instantly using live exchange rates — also works as an INR to AUD converter with one tap.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "AUD to INR Converter - Australian Dollar to Rupee",
    seoDescription: "Free AUD to INR converter with live exchange rates. Convert Australian Dollar (AUD) to Indian Rupee (INR) or INR to AUD instantly — updated daily.",
    keywords: ["aud to inr", "australian dollar to inr", "inr to aud", "aud inr converter", "1 aud to inr", "australian dollar to rupee"],
    ogTitle: "AUD to INR Converter - Australian Dollar to Rupee | ToolZoneX",
    ogDescription: "Convert Australian Dollar (AUD) to Indian Rupee (INR) instantly using live exchange rates — also works as an INR to AUD converter.",
    schemaName: "AUD to INR Converter",
    schemaDescription: "Convert Australian Dollar (AUD) to Indian Rupee (INR) using live, daily-updated exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is 1 Australian dollar in Indian rupees?", answer: "One Australian Dollar is typically worth somewhere in the range of ₹53–₹58, depending on current market conditions. Use the calculator above for today's exact live rate." }, { question: "How much is A$100 in INR?", answer: "At an example rate of ₹56 per A$1, A$100 converts to about ₹5,600. Enter 100 in the calculator above to see today's exact figure." }, { question: "How current is the AUD to INR exchange rate?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day. They're accurate for estimates, but banks and money-transfer services apply their own rate plus a fee." }, { question: "Can I convert INR to AUD on this page too?", answer: "Yes — tap the swap icon to flip the direction to INR to AUD." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
