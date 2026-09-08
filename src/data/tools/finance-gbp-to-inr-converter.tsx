import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/gbp-to-inr-converter",
    navName: "GBP to INR Converter",
    navDescription: "Convert British Pounds to Indian Rupees with live rates.",
    name: "GBP to INR Converter (Pound to Rupee)",
    description: "Convert British Pound (GBP) to Indian Rupee (INR) instantly using live exchange rates — also works as an INR to GBP converter with one tap.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "GBP to INR Converter - Pound to Rupee Today",
    seoDescription: "Free pound to INR converter with live exchange rates. Convert British Pound (GBP) to Indian Rupee (INR) or INR to GBP instantly — updated daily.",
    keywords: ["gbp to inr", "pound to inr", "inr to gbp", "pound to rupee", "british pound to inr", "gbp inr converter", "1 pound to inr"],
    ogTitle: "GBP to INR Converter - Pound to Rupee Today | ToolZoneX",
    ogDescription: "Convert British Pound (GBP) to Indian Rupee (INR) instantly using live exchange rates — also works as an INR to GBP converter.",
    schemaName: "GBP to INR Converter",
    schemaDescription: "Convert British Pound (GBP) to Indian Rupee (INR) using live, daily-updated exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is 1 pound in Indian rupees?", answer: "One British Pound is typically worth somewhere in the range of ₹105–₹112, depending on current market conditions. Use the calculator above for today's exact live rate." }, { question: "How much is £100 in INR?", answer: "At an example rate of ₹108 per £1, £100 converts to about ₹10,800. Enter 100 in the calculator above to see today's exact figure." }, { question: "How current is the GBP to INR exchange rate?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day. They're accurate for estimates, but banks and money-transfer services apply their own rate plus a fee." }, { question: "Can I convert INR to GBP on this page too?", answer: "Yes — tap the swap icon to flip the direction to INR to GBP." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
