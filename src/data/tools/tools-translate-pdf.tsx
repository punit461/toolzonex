import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/translate-pdf",
    navName: "Translate PDF",
    navDescription: "Translate a PDF's text online.",
    name: "Translate PDF",
    description: "Extract a PDF's text and translate it into another language. Free, private text extraction with translation via a public API.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Translate PDF Online Free - PDF Translator",
    seoDescription: "Free online PDF translator. Extract text from a PDF and translate it into another language, then copy or download the translation.",
    keywords: ["translate pdf", "pdf translator", "translate pdf online", "pdf language translator", "translate pdf text"],
    ogTitle: "Translate PDF Online Free | ToolZoneX",
    ogDescription: "Extract a PDF's text and translate it into another language.",
    schemaName: "Translate PDF",
    schemaDescription: "Extract a PDF's text and translate it into another language.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How accurate is the translation?", answer: "This uses a free machine translation API, which is good for getting the gist of a document but is not a substitute for a professional or certified translation, especially for legal or medical documents." }, { question: "Why did translation fail partway through?", answer: "This tool calls a free, keyless public translation API (MyMemory) directly from your browser, which has usage limits shared across everyone using it without an API key. Heavy or repeated use — from you or other visitors — may hit that quota; wait a bit and try again, or translate a shorter document." }, { question: "Is my file uploaded anywhere?", answer: "Text is extracted in your browser, then only the extracted text (never the original PDF file) is sent to the translation API to be translated." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
