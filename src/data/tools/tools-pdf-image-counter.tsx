import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-image-counter",
    navName: "PDF Image Counter",
    navDescription: "Count how many images are in a PDF.",
    name: "PDF Image Counter",
    description: "Count how many images are embedded in a PDF file. See the total count, per-page breakdown, and list of image resources. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Image Counter - Count Images in a PDF Online",
    seoDescription: "Free online PDF image counter. Count how many images are in any PDF with a per-page breakdown and resource list.",
    keywords: ["pdf image counter", "count images in pdf", "how many images in pdf", "pdf images", "pdf image count", "count pictures in pdf"],
    ogTitle: "PDF Image Counter - Count Images in a PDF Online | ToolZoneX",
    ogDescription: "Count how many images are in any PDF file. See the total count, per-page breakdown, and list of image resources.",
    schemaName: "PDF Image Counter",
    schemaDescription: "Count how many images are embedded in a PDF file with a per-page breakdown.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this count background images?", answer: "It counts every XObject resource of subtype Image that each page references — this includes backgrounds, inline images, and embedded photographs." }, { question: "Why might the same image appear on multiple pages?", answer: "PDFs can reuse the same image resource across pages for efficiency. This tool shows unique resources and which pages reference them." }, { question: "Is my file uploaded anywhere?", answer: "No — all analysis runs in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
