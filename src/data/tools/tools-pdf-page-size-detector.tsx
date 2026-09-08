import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-page-size-detector",
    navName: "PDF Page Size Detector",
    navDescription: "Check PDF page dimensions.",
    name: "PDF Page Size Detector - Check PDF Page Dimensions Online",
    description: "Detect the dimensions of every page in a PDF in points, inches, and millimetres, and match each page to its closest standard size (A4, Letter, Legal, etc.). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Page Size Detector - Check PDF Page Dimensions Online",
    seoDescription: "Free online PDF page size detector. Check each page's dimensions in points, inches, and mm, and see the closest standard size.",
    keywords: ["pdf page size", "check pdf dimensions", "pdf page dimensions", "pdf page size detector"],
    ogTitle: "PDF Page Size Detector - Check PDF Page Dimensions Online | ToolZoneX",
    ogDescription: "Detect every page's dimensions in points, inches, and millimetres, matched to the closest standard size.",
    schemaName: "PDF Page Size Detector",
    schemaDescription: "Detect the dimensions of every page in a PDF and match each to its closest standard size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What are PDF points?", answer: "One PDF point equals 1/72 of an inch. Most standard page sizes are defined in points in the PDF specification." }, { question: "Why does a page show as \"Custom\"?", answer: "If the page dimensions don't match any of the built-in standards (A4, A3, A5, Letter, Legal, Tabloid) within 2 points, it is labelled \"Custom\"." }, { question: "Is my file uploaded anywhere?", answer: "No — size detection happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
