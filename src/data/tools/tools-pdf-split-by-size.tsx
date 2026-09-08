import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-split-by-size",
    navName: "PDF Split by Size",
    navDescription: "Split a PDF into parts under a target file size.",
    name: "PDF Split by Size",
    description: "Split a PDF into multiple files, each under a target file size. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Split by Size - Split PDF by File Size Online Free",
    seoDescription: "Split a PDF into multiple files under a target file size online. Free, private, runs in your browser.",
    keywords: ["pdf split by size", "split pdf by file size", "pdf size splitter", "break pdf into parts"],
    ogTitle: "PDF Split by Size | ToolZoneX",
    ogDescription: "Split a PDF into multiple files under a target file size. Free, private, runs in your browser.",
    schemaName: "PdfSplitBySize",
    schemaDescription: "Split a PDF into multiple files under a target file size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How accurate is the split?", answer: "The tool estimates based on average page size; actual file sizes may vary slightly." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    isHub: false,
};

export default tool;
