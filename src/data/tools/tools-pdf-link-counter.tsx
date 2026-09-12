import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-link-counter",
    navName: "PDF Link Counter",
    navDescription: "Count hyperlinks in a PDF file.",
    name: "PDF Link Counter",
    description: "Count how many hyperlinks are in a PDF file. See the total count, per-page breakdown, and a list of all URIs. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Link Counter - Count Hyperlinks in a PDF Online",
    seoDescription: "Free online PDF link counter. Count how many hyperlinks are in any PDF with a per-page breakdown and full URI list.",
    keywords: ["pdf link counter", "count links in pdf", "pdf hyperlinks", "count pdf links", "how many links in pdf", "pdf url list"],
    ogTitle: "PDF Link Counter - Count Hyperlinks in a PDF Online | ToolZoneX",
    ogDescription: "Count how many hyperlinks are in any PDF file. See the total count, per-page breakdown, and a list of all URIs.",
    schemaName: "PDF Link Counter",
    schemaDescription: "Count how many hyperlinks are in a PDF file with a per-page breakdown and URI list.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this check if the links are working?", answer: "No — this tool only lists the URIs found in the PDF. It does not verify whether the URLs are live or broken." }, { question: "What about links to other pages within the same PDF?", answer: "Internal page destination links are counted but shown as 'Page reference (local)' since they do not have a web URI." }, { question: "Is my file uploaded anywhere?", answer: "No — all analysis runs in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
