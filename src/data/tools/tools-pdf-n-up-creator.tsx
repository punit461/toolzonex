import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-n-up-creator",
    navName: "PDF N-Up Creator",
    navDescription: "Print multiple PDF pages on one sheet.",
    name: "PDF N-Up Creator - Print Multiple Pages per Sheet Online",
    description: "Combine multiple PDF pages onto a single sheet with 2-up, 4-up, 6-up, or 9-up layouts. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF N-Up Creator - Print Multiple Pages per Sheet Online",
    seoDescription: "Combine multiple PDF pages onto a single sheet with 2-up, 4-up, 6-up, or 9-up layouts. Free online N-up PDF creator.",
    keywords: ["pdf n-up", "n-up pdf", "multiple pages per sheet", "pdf 2-up 4-up", "print multiple pages per sheet", "n-up printer pdf", "pdf n up creator", "nup pdf tool", "combine pages per sheet pdf", "pdf handout maker", "shrink pdf pages per sheet", "pdf 2 pages per sheet", "pdf 4 pages per sheet", "pdf 9 pages per sheet", "pdf page tiling tool", "save paper pdf", "pdf layout printer", "multiple pdf pages on one page", "pdf compact print", "pdf page saver tool", "pdf page saver print multiple", "pdf nup", "nup pdf creator online free", "pdf print multiple pages per sheet free", "n-up pdf tool online", "pdf 2up 4up 6up 9up creator"],
    ogTitle: "PDF N-Up Creator - Print Multiple Pages per Sheet Online | ToolZoneX",
    ogDescription: "Combine multiple PDF pages onto a single sheet with 2-up, 4-up, 6-up, or 9-up layouts. Free, private, runs in your browser.",
    schemaName: "PDF N-Up Creator",
    schemaDescription: "Combine multiple PDF pages onto a single sheet with 2-up, 4-up, 6-up, or 9-up layouts.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does N-up mean?", answer: "N-up means printing N pages on a single sheet of paper. For example, 4-up places four original pages in a 2x2 grid on one sheet." }, { question: "Can I choose the page order?", answer: "Pages are placed left-to-right, top-to-bottom in reading order. This tool does not currently offer custom ordering." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing happens locally in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
