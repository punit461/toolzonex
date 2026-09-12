import CropIcon from '@mui/icons-material/Crop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/crop-aadhar-card",
    navName: "Crop Aadhar Card",
    navDescription: "Crop an Aadhar card PDF or image to standard size.",
    name: "Crop Aadhar Card Online Free",
    description: "Crop an Aadhar card PDF or image to the standard 85.6 × 53.98 mm size. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <CropIcon fontSize="large" color="primary"/>,
    seoTitle: "Crop Aadhar Card Online Free",
    seoDescription: "Crop an Aadhar card PDF or image to the standard card size online. Free, private, runs in your browser.",
    keywords: ["crop aadhar card", "aadhar card crop", "resize aadhar card", "aadhar card size"],
    ogTitle: "Crop Aadhar Card Online Free | ToolZoneX",
    ogDescription: "Crop an Aadhar card PDF or image to the standard card size online. Free, private, runs in your browser.",
    schemaName: "Crop Aadhar Card",
    schemaDescription: "Crop an Aadhar card PDF or image to standard card size.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it change the card itself?", answer: "No — it trims the surrounding white space to the card's dimensions. The card content stays intact." }, { question: "What if my card is rotated?", answer: "This tool assumes the card is upright. Rotate the PDF first if needed." }, { question: "Is my file uploaded anywhere?", answer: "No — cropping happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
