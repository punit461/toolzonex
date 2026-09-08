import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/passport-size-photo-maker",
    navName: "Passport Size Photo Maker",
    navDescription: "Create passport-size photos from an image.",
    name: "Passport Size Photo Maker - Create Passport Photo Online",
    description: "Create passport-size photos from an uploaded image and print multiple copies on a 4 × 6 inch sheet. Free, private, runs entirely in your browser.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Passport Size Photo Maker - Create Passport Photo Online",
    seoDescription: "Create passport-size photos from an uploaded image and print multiple copies on a 4 × 6 inch sheet. Free, private, runs in your browser.",
    keywords: ["passport size photo", "passport photo maker", "create passport photo", "passport photo online"],
    ogTitle: "Passport Size Photo Maker - Create Passport Photo Online | ToolZoneX",
    ogDescription: "Create passport-size photos from an uploaded image and print multiple copies on a sheet. Free, private, runs in your browser.",
    schemaName: "Passport Size Photo Maker",
    schemaDescription: "Create passport-size photos from an uploaded image.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does it keep my exact photo?", answer: "The tool center-crops to the target aspect ratio, so the edges of your image may be trimmed to fit the standard. Use a well-framed headshot." }, { question: "How many photos fit on a sheet?", answer: "It depends on the standard, but a 4 × 6 inch sheet typically holds 6–8 photos, which the tool arranges automatically." }, { question: "Is my photo uploaded anywhere?", answer: "No — cropping and PDF creation happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
