import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-header-footer",
    navName: "Remove Header & Footer",
    navDescription: "Remove headers and footers from a PDF.",
    name: "Remove Header & Footer from PDF Online Free",
    description: "Remove headers and footers from a PDF by blanking out the top and bottom margins on every page. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Header & Footer from PDF Online Free",
    seoDescription: "Remove headers and footers from a PDF online for free. Blank out the top and bottom margins of every page with custom heights.",
    keywords: ["remove header footer pdf", "delete pdf header", "pdf header remover", "strip pdf footer"],
    ogTitle: "Remove Header & Footer from PDF Online Free | ToolZoneX",
    ogDescription: "Remove headers and footers from a PDF by blanking out the top and bottom margins on every page. Free, private, runs in your browser.",
    schemaName: "Remove Header & Footer",
    schemaDescription: "Remove headers and footers from a PDF by blanking out top and bottom margins.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this delete the text, or just cover it?", answer: "White rectangles are drawn over the specified areas, visually hiding the content. The underlying text data may still exist in the PDF structure." }, { question: "What margin values should I use?", answer: "Measure or estimate the height of the header or footer area in millimeters. Common values are 10 to 20 mm for headers and 8 to 15 mm for footers." }, { question: "Is my file uploaded anywhere?", answer: "No — processing happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
