import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-barcode-to-pdf",
    navName: "Add Barcode to PDF",
    navDescription: "Stamp a barcode onto a PDF page.",
    name: "Add Barcode to PDF",
    description: "Generate a barcode and embed it onto a chosen page and position in a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add Barcode to PDF Online Free",
    seoDescription: "Free online tool to add a barcode to a PDF. Choose the value, barcode format, page, and position, then download the stamped PDF.",
    keywords: ["add barcode to pdf", "insert barcode pdf", "pdf barcode stamp", "embed barcode in pdf", "pdf barcode generator"],
    ogTitle: "Add Barcode to PDF Online Free | ToolZoneX",
    ogDescription: "Generate a barcode and embed it onto a chosen page and position in a PDF.",
    schemaName: "Add Barcode to PDF",
    schemaDescription: "Generate a barcode and embed it onto a chosen page and position in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Which barcode format should I use?", answer: "CODE128 works for general alphanumeric text, UPC/EAN are standard for retail products, and CODE39 is common in logistics and inventory systems." }, { question: "Can I add a barcode to more than one page?", answer: "This tool adds one barcode to one chosen page per run — repeat the process (uploading the result again) to stamp additional pages." }, { question: "Is my file uploaded anywhere?", answer: "No — barcode generation and embedding both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
