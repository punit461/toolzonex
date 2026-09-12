import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/flipkart-label-cropper",
    navName: "Flipkart Label Cropper",
    navDescription: "Crop Flipkart shipping labels to 4x6.",
    name: "Flipkart Label Cropper",
    description: "Crop Flipkart shipping label PDFs down to a clean 4x6 label, removing the tax invoice or blank space. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Flipkart Label Cropper - Crop Flipkart Shipping Labels Online",
    seoDescription: "Free online Flipkart label cropper. Trim Flipkart shipping label PDFs to a clean 4x6 thermal-printer size with a live preview.",
    keywords: ["flipkart label cropper", "crop flipkart label", "flipkart shipping label pdf", "flipkart 4x6 label", "flipkart label size"],
    ogTitle: "Flipkart Label Cropper - Crop Shipping Labels Online | ToolZoneX",
    ogDescription: "Crop Flipkart shipping label PDFs down to a clean 4x6 label.",
    schemaName: "Flipkart Label Cropper",
    schemaDescription: "Crop Flipkart shipping label PDFs down to a clean 4x6 label.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why doesn't a preset line up with my label?", answer: "Flipkart's label layout can vary by shipment type and courier partner. Use the live preview and switch to Custom to enter the exact box in inches." }, { question: "Does this work for multi-shipment bulk label PDFs?", answer: "Yes — the same crop region is applied to every page, so a bulk manifest with many shipments is cropped in one pass." }, { question: "Is my file uploaded anywhere?", answer: "No — cropping happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
