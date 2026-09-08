import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-grayscale-converter",
    navName: "PDF Grayscale Converter",
    navDescription: "Convert a color PDF to grayscale.",
    name: "PDF Grayscale Converter",
    description: "Convert every page of a color PDF to grayscale using a standard luminance formula. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Grayscale Converter - Convert PDF to Grayscale Free",
    seoDescription: "Free online PDF to grayscale converter. Convert every page of a color PDF to shades of gray, entirely in your browser.",
    keywords: ["pdf grayscale converter", "convert pdf to grayscale", "pdf black and white", "grayscale pdf online", "pdf to gray"],
    ogTitle: "PDF Grayscale Converter Online Free | ToolZoneX",
    ogDescription: "Convert every page of a color PDF to grayscale using a standard luminance formula.",
    schemaName: "PDF Grayscale Converter",
    schemaDescription: "Convert every page of a color PDF to grayscale using a standard luminance formula.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Black & White Converter?", answer: "Grayscale keeps a full range of gray shades based on each pixel's brightness. The Black & White Converter instead reduces every pixel to pure black or pure white using a threshold." }, { question: "Will my text still be selectable afterward?", answer: "No — converting to grayscale requires redrawing each page as an image, so text and vector content become part of a flattened, non-selectable image." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
