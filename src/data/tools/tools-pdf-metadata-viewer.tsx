import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-metadata-viewer",
    navName: "PDF Metadata Viewer",
    navDescription: "View all properties of a PDF.",
    name: "PDF Metadata Viewer",
    description: "View all metadata properties of a PDF — title, author, dates, keywords, and more. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Metadata Viewer - View PDF Properties Online",
    seoDescription: "View all metadata properties of a PDF — title, author, dates, keywords, and more. Free, private, runs entirely in your browser.",
    keywords: ["pdf metadata", "view pdf properties", "pdf document info", "pdf metadata viewer"],
    ogTitle: "PDF Metadata Viewer - View PDF Properties Online | ToolZoneX",
    ogDescription: "View all metadata properties of a PDF — title, author, dates, keywords, and more. Free, private, runs entirely in your browser.",
    schemaName: "PDF Metadata Viewer",
    schemaDescription: "View all metadata properties of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What metadata fields can I see?", answer: "Title, author, subject, creator, producer, keywords, creation date, and modification date." }, { question: "Does this modify my PDF?", answer: "No — this is a read-only viewer. Your original file stays exactly as it is." }],
    isHub: false,
};

export default tool;
