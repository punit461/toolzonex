import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/ocr-pdf",
    navName: "OCR PDF",
    navDescription: "Extract text from scanned PDFs using in-browser OCR.",
    name: "OCR PDF",
    description: "Extract text from a scanned or image-based PDF using optical character recognition, entirely in your browser. Also works as an \"extract text from PDF with OCR\" tool. Free and private.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "OCR PDF - Extract Text from Scanned PDF Online Free",
    seoDescription: "Free online OCR PDF tool. Extract text from scanned or image-based PDFs using optical character recognition, entirely in your browser. No upload, no signup.",
    keywords: ["ocr pdf", "extract text from pdf with ocr", "pdf ocr online", "scanned pdf to text", "ocr scanned pdf free", "convert scanned pdf to text"],
    ogTitle: "OCR PDF Online Free | ToolZoneX",
    ogDescription: "Extract text from a scanned or image-based PDF using optical character recognition, entirely in your browser.",
    schemaName: "OCR PDF",
    schemaDescription: "Extract text from a scanned or image-based PDF using optical character recognition, entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How accurate is the OCR?", answer: "It depends heavily on scan quality — clear, non-skewed, high-contrast scans of printed text give the best results. Blurry, rotated, low-resolution, or handwritten pages will produce more errors." }, { question: "Does this support languages other than English?", answer: "Not in this version — recognition currently runs in English only. The underlying OCR engine supports other language packs, but they aren't wired up here yet to keep the tool simple and fast to load." }, { question: "Why is this slower than PDF to Text?", answer: "Regular text extraction reads an existing text layer instantly. OCR visually analyzes every page as an image and recognizes each character, which takes real computation — several seconds per page is normal." }, { question: "Is my file uploaded anywhere?", answer: "No — rendering and OCR both run entirely in your browser. The OCR engine and language data download once from a public CDN on first use, but your PDF is never sent anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
