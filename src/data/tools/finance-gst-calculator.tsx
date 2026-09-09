import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/gst-calculator",
    navName: "GST Calculator",
    navDescription: "Add or remove GST from any amount.",
    name: "GST Calculator",
    description: "Add or remove Goods and Services Tax (GST) from any amount instantly.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "GST Calculator - Add or Remove GST from Amount",
    seoDescription: "Free GST calculator to add or remove GST from any amount. Calculate inclusive and exclusive prices instantly for 5%, 12%, 18%, and 28% GST rates.",
    keywords: ["GST calculator", "GST rate", "add GST", "remove GST", "inclusive GST", "exclusive GST", "goods and services tax"],
    ogTitle: "GST Calculator - Add or Remove GST from Amount | ToolZoneX",
    ogDescription: "Free GST calculator to add or remove GST from any amount instantly.",
    schemaName: "GST Calculator",
    schemaDescription: "Add or remove GST from any amount.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between CGST, SGST, and IGST?", answer: "For sales within a state, GST splits equally into CGST (central) and SGST (state). For inter-state sales, IGST applies instead, going to the central government and then apportioned to the destination state." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
