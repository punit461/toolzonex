import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-html",
    navName: "PDF to HTML",
    navDescription: "Convert a PDF into a simple HTML page.",
    name: "PDF to HTML - Convert PDF to HTML Online",
    description: "Extract text from a PDF and convert it into a structured HTML page. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to HTML Converter - Convert PDF to HTML Online",
    seoDescription: "Free online PDF to HTML converter. Extract text from a PDF and convert it into a structured HTML page.",
    keywords: ["pdf to html", "convert pdf to html", "pdf to webpage", "pdf html converter"],
    ogTitle: "PDF to HTML Converter - Convert PDF to HTML Online | ToolZoneX",
    ogDescription: "Extract text from a PDF and convert it into a structured HTML page. Free, private, runs in your browser.",
    schemaName: "PDF to HTML",
    schemaDescription: "Extract text from a PDF and convert it to a structured HTML page.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will images from the PDF be included?", answer: "No — only the text layer is converted. Images embedded in the PDF are not extracted." }, { question: "Does the HTML preserve exact layout?", answer: "The tool approximates the document structure using font sizes for heading levels, but pixel-perfect layout is not guaranteed." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
