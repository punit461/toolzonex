import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-snapshot-tool",
    navName: "PDF Snapshot Tool",
    navDescription: "Capture a PDF page as a high-resolution image.",
    name: "PDF Snapshot Tool - Capture PDF Page as Image Online",
    description: "Capture any page from a PDF as a high-resolution image. Enter the page number and download it as a PNG.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Snapshot Tool - Capture PDF Page as Image Online",
    seoDescription: "Free online PDF snapshot tool. Capture any page from a PDF as a high-resolution PNG image at 3x scale.",
    keywords: ["pdf snapshot", "capture pdf page", "pdf to image", "screenshot pdf page", "pdf page to png", "extract pdf page image"],
    ogTitle: "PDF Snapshot Tool - Capture PDF Page as Image Online | ToolZoneX",
    ogDescription: "Capture any page from a PDF as a high-resolution image. Enter the page number and download it as a PNG. Free, private, runs in your browser.",
    schemaName: "PDF Snapshot Tool",
    schemaDescription: "Capture any page from a PDF as a high-resolution image. Enter the page number and download it as a PNG.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What resolution is the snapshot?", answer: "Pages are rendered at 3x scale (approximately 216 DPI) for crisp output." }, { question: "Does this work with scanned PDFs?", answer: "Yes, any PDF page can be captured regardless of its content type." }, { question: "Is my file uploaded anywhere?", answer: "No — rendering and capture happen entirely in your browser." }],
    isHub: false,
    noindex: true,
};

export default tool;
