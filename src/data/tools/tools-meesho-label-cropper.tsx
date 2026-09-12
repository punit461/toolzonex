import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/meesho-label-cropper",
    navName: "Meesho Label Cropper",
    navDescription: "Crop Meesho shipping labels to 4x6.",
    name: "Meesho Label Cropper",
    description: "Crop Meesho shipping label PDFs down to a clean 4x6 label, removing invoice or blank space. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Meesho Label Cropper - Crop Meesho Shipping Labels Online",
    seoDescription: "Free online Meesho label cropper. Trim Meesho shipping label PDFs to a clean 4x6 thermal-printer size with a live preview.",
    keywords: ["meesho label cropper", "crop meesho label", "meesho shipping label pdf", "meesho 4x6 label", "meesho label size"],
    ogTitle: "Meesho Label Cropper - Crop Shipping Labels Online | ToolZoneX",
    ogDescription: "Crop Meesho shipping label PDFs down to a clean 4x6 label.",
    schemaName: "Meesho Label Cropper",
    schemaDescription: "Crop Meesho shipping label PDFs down to a clean 4x6 label.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why doesn't a preset line up with my label?", answer: "Meesho occasionally changes its label layout, and label position can vary by seller settings. Use the preview and switch to Custom to enter the exact box in inches." }, { question: "Does this work for multi-order bulk label PDFs?", answer: "Yes — the same crop region is applied to every page, so a bulk PDF with dozens of orders is cropped in one pass." }, { question: "Is my file uploaded anywhere?", answer: "No — cropping happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
