import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/invoice-total-calculator",
    navName: "Invoice Total Calculator",
    navDescription: "Subtotal, discount, tax & total math.",
    name: "Invoice Total Calculator",
    description: "Calculate an invoice's subtotal, discount, tax, and grand total from itemized line items, without generating a document.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Invoice Total Calculator - Subtotal, Discount & Tax",
    seoDescription: "Free invoice total calculator. List line items, apply a discount and tax rate, and get your invoice's subtotal, discount, tax, and total instantly.",
    keywords: ["invoice total calculator", "invoice calculator", "invoice tax calculator", "invoice subtotal calculator", "invoice math calculator"],
    ogTitle: "Invoice Total Calculator - Subtotal, Discount & Tax | ToolZoneX",
    ogDescription: "Calculate an invoice's subtotal, discount, tax, and grand total from line items.",
    schemaName: "Invoice Total Calculator",
    schemaDescription: "Calculate invoice subtotal, discount, tax, and total from itemized line items with quantity and unit price.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the site's PDF invoice generator?", answer: "The PDF invoice generator tool produces an actual downloadable, formatted PDF document you can send to a client. This calculator is just the underlying math — subtotal, discount, tax, and total — with no document or PDF output, useful for a quick check without generating a full invoice file." }, { question: "Is the discount applied before or after tax?", answer: "Before — this calculator applies the discount to the subtotal first, then calculates tax on the discounted amount, which matches how most invoices and point-of-sale systems apply discounts and tax." }, { question: "Can I use a fixed dollar discount larger than the subtotal?", answer: "The discount is capped at the subtotal amount, so the discounted total never goes below $0 before tax is applied." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
