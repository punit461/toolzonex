import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/reverse-tax-calculator",
    navName: "Reverse Tax Calculator",
    navDescription: "Pre-tax price from a tax-inclusive total.",
    name: "Reverse Tax Calculator",
    description: "Calculate the pre-tax price and tax amount from a tax-inclusive total price and tax rate, reversing a forward sales-tax calculation.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Reverse Tax Calculator - Pre-Tax Price From Total",
    seoDescription: "Free reverse tax calculator. Enter a tax-inclusive total price and tax rate to find the pre-tax price and the tax amount included.",
    keywords: ["reverse tax calculator", "reverse sales tax calculator", "back out sales tax calculator", "tax inclusive to exclusive calculator", "pre tax price calculator"],
    ogTitle: "Reverse Tax Calculator - Pre-Tax Price | ToolZoneX",
    ogDescription: "Find the pre-tax price and tax amount from a tax-inclusive total.",
    schemaName: "Reverse Tax Calculator",
    schemaDescription: "Calculate the pre-tax price and tax amount from a tax-inclusive total price and tax rate.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why can't I just subtract the tax percentage from the total?", answer: "Because the tax rate was applied to the pre-tax price, not the final total — subtracting 7.5% of $107.50 gives $8.06, not the correct $7.50 tax amount. Dividing the total by (1 + tax rate) correctly reverses the original calculation." }, { question: "Does this work for VAT as well as sales tax?", answer: "Yes — the math is identical whether the tax-inclusive amount includes sales tax, VAT, or GST. Just enter the applicable rate and the tax-inclusive total; the calculator doesn't need to know which specific tax it is." }, { question: "What if a price includes multiple different tax rates?", answer: "This calculator assumes a single combined tax rate. If separate taxes stack (like a state rate plus a local rate), add them together into one combined percentage first, since sales taxes are typically applied on the same base rather than compounding on each other." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
