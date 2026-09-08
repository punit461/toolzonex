import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/amazon-label-cropper",
    navName: "Amazon Label Cropper",
    navDescription: "Crop Amazon shipping labels to 4x6.",
    name: "Amazon Label Cropper",
    description: "Crop Amazon FBA or Easy Ship shipping label PDFs down to a clean 4x6 label, removing the packing slip or blank space. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Amazon Label Cropper - Crop Amazon Shipping Labels Online",
    seoDescription: "Free online Amazon label cropper. Trim Amazon FBA or Easy Ship shipping label PDFs to a clean 4x6 thermal-printer size with a live preview.",
    keywords: ["amazon label cropper", "crop amazon label", "amazon shipping label pdf", "amazon fba 4x6 label", "amazon easy ship label"],
    ogTitle: "Amazon Label Cropper - Crop Shipping Labels Online | ToolZoneX",
    ogDescription: "Crop Amazon shipping label PDFs down to a clean 4x6 label.",
    schemaName: "Amazon Label Cropper",
    schemaDescription: "Crop Amazon shipping label PDFs down to a clean 4x6 label.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why doesn't a preset line up with my label?", answer: "Amazon's label layout varies between FBA, Easy Ship, and self-ship order types. Use the live preview and switch to Custom to enter the exact box in inches." }, { question: "Does this work for multi-order bulk label PDFs?", answer: "Yes — the same crop region is applied to every page, so a bulk PDF with many orders is cropped in one pass." }, { question: "Is my file uploaded anywhere?", answer: "No — cropping happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
