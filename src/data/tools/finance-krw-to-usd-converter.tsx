import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/krw-to-usd-converter",
    navName: "KRW to USD Converter",
    navDescription: "Convert Korean Won to US Dollar with live rates.",
    name: "KRW to USD Converter (Korean Won to Dollar)",
    description: "Convert Korean Won (KRW) to US Dollar (USD) instantly using live exchange rates — also works as a USD to KRW converter with one tap.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyExchangeIcon fontSize="large" color="primary"/>,
    seoTitle: "KRW to USD Converter - Korean Won to Dollar",
    seoDescription: "Free won to USD converter with live exchange rates. Convert Korean Won (KRW) to US Dollar (USD) or USD to KRW instantly — updated daily.",
    keywords: ["krw to usd", "korean won to dollar", "usd to krw", "won to usd converter", "won to dollar", "korean won converter", "1000 won to usd", "usd/krw"],
    ogTitle: "KRW to USD Converter - Korean Won to Dollar | ToolZoneX",
    ogDescription: "Convert Korean Won (KRW) to US Dollar (USD) instantly using live exchange rates — also works as a USD to KRW converter.",
    schemaName: "KRW to USD Converter",
    schemaDescription: "Convert Korean Won (KRW) to US Dollar (USD) using live, daily-updated exchange rates.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How much is 1,000 Korean won in US dollars?", answer: "At an example rate of ₩1,350 per $1, 1,000 KRW is about $0.74. Enter 1,000 in the calculator above to see the exact figure using today's live rate." }, { question: "What is 1 US dollar in Korean won?", answer: "One US dollar is typically worth somewhere in the range of ₩1,300–1,450, depending on current market conditions. Use the swap icon above to convert USD to KRW and see today's exact rate." }, { question: "How current is the KRW to USD exchange rate?", answer: "Rates are sourced from the European Central Bank's daily reference rates, typically updated once each business day. They're accurate for estimates, but banks and money-transfer services apply their own rates plus a markup or fee." }, { question: "Can I convert USD to KRW on this page too?", answer: "Yes — tap the swap icon to flip the direction to USD → KRW." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
