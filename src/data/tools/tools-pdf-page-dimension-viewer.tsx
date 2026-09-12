import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-page-dimension-viewer",
    navName: "PDF Dimension Viewer",
    navDescription: "View PDF page dimensions in multiple units.",
    name: "PDF Page Dimension Viewer - Check PDF Page Sizes Online",
    description: "View every page's width and height in points, inches, millimetres, and centimetres. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Page Dimension Viewer - Check PDF Page Sizes Online",
    seoDescription: "Free online PDF page dimension viewer. Check every page's width and height in points, inches, mm, and cm.",
    keywords: ["pdf page dimensions", "check pdf page size", "pdf width and height", "pdf dimension viewer", "pdf page size in inches", "pdf page size in mm"],
    ogTitle: "PDF Page Dimension Viewer - Check PDF Page Sizes Online | ToolZoneX",
    ogDescription: "View every page's width and height in points, inches, millimetres, and centimetres.",
    schemaName: "PDF Page Dimension Viewer",
    schemaDescription: "View every page's width and height in points, inches, millimetres, and centimetres.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a PDF point?", answer: "One PDF point equals 1/72 of an inch (approximately 0.353 mm). All standard page sizes in the PDF specification are defined in points." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
