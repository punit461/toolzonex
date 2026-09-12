import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/sales-tax-calculator",
    navName: "Sales Tax Calculator",
    navDescription: "Add or remove US sales tax by amount.",
    name: "Sales Tax Calculator",
    description: "Calculate US sales tax: add tax to a pre-tax amount, or back out the base price from a tax-included total, with quick-select state example rates.",
    navCategory: "Finance",
    shellCategory: "Utilities",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Sales Tax Calculator - Add or Remove US Sales Tax",
    seoDescription: "Free US sales tax calculator. Add tax to a pre-tax amount or back out the base from a tax-included total, with quick-select state example rates.",
    keywords: ["sales tax calculator", "us sales tax", "calculate sales tax", "tax included calculator", "remove sales tax", "tax rate calculator", "state sales tax"],
    ogTitle: "Sales Tax Calculator - Add or Remove US Sales Tax | ToolZoneX",
    ogDescription: "Add tax to a pre-tax amount or back out the base from a tax-included total, with quick-select state rates.",
    schemaName: "Sales Tax Calculator",
    schemaDescription: "Calculate US sales tax by adding it to a pre-tax amount or backing it out of a tax-included total.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Is the state rate the full tax I'll pay?", answer: "Not necessarily — many cities, counties, and special districts add local tax on top of the state rate, and some states exempt certain goods. The presets are illustrative state-level examples." }, { question: "How do I remove tax from a total?", answer: "Switch to 'Tax included' mode and enter the total; the calculator divides by (1 + rate) to find the pre-tax base and tax portion." }, { question: "Is tax charged on shipping?", answer: "This varies by state; in many states shipping is taxable when the goods are taxable. It's excluded here unless added into the amount." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
