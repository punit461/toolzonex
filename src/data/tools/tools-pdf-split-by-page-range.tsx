import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-split-by-page-range",
    navName: "Split PDF by Page Range",
    navDescription: "Split a PDF into files by page range.",
    name: "Split PDF by Page Range",
    description: "Split a PDF into multiple files, one per page range you specify. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Split PDF by Page Range Online Free",
    seoDescription: "Free online tool to split a PDF into multiple files by page range. Enter several ranges to download several separate PDFs at once.",
    keywords: ["split pdf by page range", "split pdf into multiple files", "pdf splitter", "split pdf by range", "divide pdf pages"],
    ogTitle: "Split PDF by Page Range Online Free | ToolZoneX",
    ogDescription: "Split a PDF into multiple files, one per page range you specify.",
    schemaName: "Split PDF by Page Range",
    schemaDescription: "Split a PDF into multiple files, one per page range you specify.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What happens with just one range?", answer: "You get a single downloaded PDF containing only those pages — equivalent to extracting pages." }, { question: "Why do the files download one after another instead of as a zip?", answer: "This tool downloads each split file directly as soon as it's ready, so you don't need to unzip anything afterward. Your browser may ask to allow multiple downloads the first time." }, { question: "Is my file uploaded anywhere?", answer: "No — splitting happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
