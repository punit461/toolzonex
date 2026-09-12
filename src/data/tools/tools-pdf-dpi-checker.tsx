import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-dpi-checker",
    navName: "PDF DPI Checker",
    navDescription: "Check the effective DPI of a PDF.",
    name: "PDF DPI Checker - Check PDF Resolution Online",
    description: "Check the effective DPI and pixel dimensions of a PDF page. Verify print quality before sending to a printer. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF DPI Checker - Check PDF Resolution Online",
    seoDescription: "Free online PDF DPI checker. See the effective DPI, page dimensions in points and pixels, and verify print quality for any PDF.",
    keywords: ["pdf dpi", "check pdf resolution", "pdf dpi checker", "pdf image resolution", "pdf print quality", "pdf resolution check"],
    ogTitle: "PDF DPI Checker - Check PDF Resolution Online | ToolZoneX",
    ogDescription: "Check the effective DPI and pixel dimensions of a PDF page. Verify print quality before sending to a printer. Free, private, runs entirely in your browser.",
    schemaName: "PDF DPI Checker",
    schemaDescription: "Check the effective DPI and pixel dimensions of a PDF page.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why only the first page?", answer: "Most PDFs have consistent resolution across all pages. Checking the first page gives a reliable indicator of the entire document." }, { question: "What DPI is good for printing?", answer: "300 DPI is the standard for high-quality printing. Below 150 DPI may appear blurry at normal viewing distance." }, { question: "Is my file uploaded anywhere?", answer: "No — the check happens entirely in your browser; the PDF never leaves your device." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
