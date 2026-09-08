import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/xml-to-pdf",
    navName: "XML to PDF",
    navDescription: "Convert formatted XML into a PDF.",
    name: "XML to PDF",
    description: "Pretty-print XML and convert it into a paginated PDF document. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "XML to PDF Converter Online Free",
    seoDescription: "Free online XML to PDF converter. Paste or upload XML, get it pretty-printed and rendered as a paginated PDF document.",
    keywords: ["xml to pdf", "convert xml to pdf", "xml to pdf converter", "export xml as pdf", "pretty print xml pdf"],
    ogTitle: "XML to PDF Converter Online Free | ToolZoneX",
    ogDescription: "Pretty-print XML and convert it into a paginated PDF document.",
    schemaName: "XML to PDF",
    schemaDescription: "Pretty-print XML and convert it into a paginated PDF document.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this validate my XML?", answer: "Not strictly — it uses a lightweight, regex-based re-indenter, so it focuses on formatting rather than full schema validation." }, { question: "What happens to very long lines or deeply nested elements?", answer: "Long lines are wrapped to fit the page width, and the PDF automatically adds new pages as content runs long." }, { question: "Is my XML uploaded anywhere?", answer: "No — formatting and PDF generation both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
