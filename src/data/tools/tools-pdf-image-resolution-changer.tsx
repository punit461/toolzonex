import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-image-resolution-changer",
    navName: "PDF Image Resolution Changer",
    navDescription: "Change the DPI resolution of images in a PDF.",
    name: "PDF Image Resolution Changer - Change PDF DPI Online",
    description: "Change the resolution (DPI) of images in a PDF. Choose from 72, 150, or 300 DPI. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Image Resolution Changer - Change PDF DPI Online",
    seoDescription: "Free online PDF image resolution changer. Change the DPI of images in a PDF to 72, 150, or 300 for screen or print quality.",
    keywords: ["change pdf dpi", "pdf resolution changer", "pdf image dpi", "adjust pdf resolution"],
    ogTitle: "PDF Image Resolution Changer - Change PDF DPI Online | ToolZoneX",
    ogDescription: "Change the DPI of images in a PDF. Choose 72, 150, or 300 DPI. Free, private, runs in your browser.",
    schemaName: "PDF Image Resolution Changer",
    schemaDescription: "Change the resolution (DPI) of images in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will increasing DPI add new detail?", answer: "No — upscaling re-renders the page at a higher pixel density but cannot recover detail that wasn't in the original." }, { question: "Does this preserve text quality?", answer: "Text is re-rasterized as part of the page image, so it may appear slightly different. For text-only PDFs, consider tools that modify resolution without rasterizing." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
