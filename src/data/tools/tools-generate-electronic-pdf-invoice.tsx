import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/generate-electronic-pdf-invoice",
    navName: "Generate PDF Invoice",
    navDescription: "Create a professional invoice PDF from form inputs.",
    name: "Generate Electronic PDF Invoice Online Free",
    description: "Create a professional invoice PDF from form inputs with line items, tax, and totals. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Generate Electronic PDF Invoice Online Free",
    seoDescription: "Create a professional invoice PDF from form inputs with line items, tax, and totals. Free, private, runs entirely in your browser.",
    keywords: ["generate pdf invoice", "create invoice pdf", "pdf invoice maker", "electronic invoice generator"],
    ogTitle: "Generate Electronic PDF Invoice Online Free | ToolZoneX",
    ogDescription: "Create a professional invoice PDF from form inputs with line items, tax, and totals. Free, private, runs entirely in your browser.",
    schemaName: "Generate PDF Invoice",
    schemaDescription: "Create a professional invoice PDF from form inputs with line items, tax, and totals.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I customize the layout?", answer: "The invoice uses a standard professional format. For full customization, generate the invoice and edit it in a PDF editor." }, { question: "Is my data uploaded anywhere?", answer: "No — the invoice is generated entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
