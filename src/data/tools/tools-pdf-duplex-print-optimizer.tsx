import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-duplex-print-optimizer",
    navName: "PDF Duplex Print Optimizer",
    navDescription: "Prepare a PDF for double-sided printing.",
    name: "PDF Duplex Print Optimizer - Prepare PDF for Double-Sided Printing",
    description: "Optimise a PDF for double-sided (duplex) printing by ensuring an even page count. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Duplex Print Optimizer - Prepare PDF for Double-Sided Printing",
    seoDescription: "Free online PDF duplex print optimizer. Add blank pages as needed to ensure correct front-back alignment for double-sided printing.",
    keywords: ["duplex print pdf", "double sided printing pdf", "pdf duplex optimizer", "print ready pdf"],
    ogTitle: "PDF Duplex Print Optimizer - Prepare PDF for Double-Sided Printing | ToolZoneX",
    ogDescription: "Prepare a PDF for double-sided printing. Free, private, runs in your browser.",
    schemaName: "PDF Duplex Print Optimizer",
    schemaDescription: "Optimise a PDF for double-sided printing by ensuring an even page count.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if my PDF already has an even page count?", answer: "No blank pages are added — the file is downloaded as-is since it is already duplex-ready." }, { question: "Does this rearrange pages?", answer: "No — page order is preserved. The tool only appends a blank page when needed to make the total count even." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
