import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/extract-images-from-pdf",
    navName: "Extract Images from PDF",
    navDescription: "Pull embedded images out of a PDF.",
    name: "Extract Images from PDF Online Free",
    description: "Extract all embedded images from a PDF as individual PNG files. Preview thumbnails with download buttons. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract Images from PDF Online Free",
    seoDescription: "Extract all embedded images from a PDF as individual PNG files with preview thumbnails.",
    keywords: ["extract images from pdf", "get images from pdf", "pdf image extractor", "download pdf images"],
    ogTitle: "Extract Images from PDF Online Free | ToolZoneX",
    ogDescription: "Extract all embedded images from a PDF as individual PNG files with preview thumbnails.",
    schemaName: "Extract Images from PDF",
    schemaDescription: "Extract all embedded images from a PDF as individual PNG files with preview thumbnails.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why are some images not found?", answer: "Images rendered as part of the page drawing stream (not stored as separate XObject image resources) cannot be individually extracted." }, { question: "What format are the extracted images?", answer: "All images are exported as PNG files to preserve quality." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
