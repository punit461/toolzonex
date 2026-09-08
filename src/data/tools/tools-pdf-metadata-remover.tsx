import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-metadata-remover",
    navName: "PDF Metadata Remover",
    navDescription: "Strip all metadata from a PDF.",
    name: "PDF Metadata Remover",
    description: "Strip all metadata from a PDF — title, author, dates, keywords, and more. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Metadata Remover - Strip PDF Properties Online",
    seoDescription: "Strip all metadata from a PDF — title, author, dates, keywords, and more. Free, private, runs entirely in your browser.",
    keywords: ["remove pdf metadata", "strip pdf metadata", "pdf metadata cleaner", "delete pdf info"],
    ogTitle: "PDF Metadata Remover - Strip PDF Properties Online | ToolZoneX",
    ogDescription: "Strip all metadata from a PDF — title, author, dates, keywords, and more. Free, private, runs entirely in your browser.",
    schemaName: "PDF Metadata Remover",
    schemaDescription: "Strip all metadata from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this affect the visible content of the PDF?", answer: "No — only hidden metadata properties are removed. The pages, text, and images remain unchanged." }, { question: "Can I undo this?", answer: "No — once metadata is stripped, it cannot be recovered. Keep a backup of the original if needed." }],
    isHub: false,
};

export default tool;
