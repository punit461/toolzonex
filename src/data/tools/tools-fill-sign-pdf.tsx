import NoteAltIcon from '@mui/icons-material/NoteAlt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/fill-sign-pdf",
    navName: "Fill & Sign PDF",
    navDescription: "Fill in text fields and draw a signature on a PDF.",
    name: "Fill & Sign PDF",
    description: "Add text fields and draw a handwritten-style signature on a PDF document.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <NoteAltIcon fontSize="large" color="primary"/>,
    seoTitle: "Fill & Sign PDF Online Free",
    seoDescription: "Free online fill and sign PDF tool — add text fields and draw your signature on any PDF. No printing or scanning needed.",
    keywords: ["fill and sign pdf", "sign pdf online", "pdf signature", "fill pdf form"],
    ogTitle: "Fill & Sign PDF Online Free | ToolZoneX",
    ogDescription: "Free online fill and sign PDF tool — add text fields and draw your signature.",
    schemaName: "Fill & Sign PDF",
    schemaDescription: "Add text fields and draw a handwritten-style signature on a PDF document.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this legally binding?", answer: "Electronic signatures have legal standing in most jurisdictions, but specific requirements vary. Consult legal advice for critical documents." }, { question: "Can I resize the signature?", answer: "The signature is embedded at a fixed width of 150 points in the bottom-right area of the page. For precise placement, use a dedicated PDF editor." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
