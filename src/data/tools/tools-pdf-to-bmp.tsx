import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-bmp",
    navName: "PDF to BMP",
    navDescription: "Convert PDF pages to BMP images.",
    name: "PDF to BMP",
    description: "Convert every page of a PDF into an uncompressed BMP image. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to BMP Converter Online Free",
    seoDescription: "Free online PDF to BMP converter. Convert each page of a PDF into an uncompressed 24-bit BMP image, downloaded directly from your browser.",
    keywords: ["pdf to bmp", "convert pdf to bmp", "pdf to bitmap", "pdf bmp converter", "pdf page to bmp"],
    ogTitle: "PDF to BMP Converter Online Free | ToolZoneX",
    ogDescription: "Convert every page of a PDF into an uncompressed BMP image.",
    schemaName: "PDF to BMP",
    schemaDescription: "Convert every page of a PDF into an uncompressed BMP image.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why are BMP files so much larger than JPG or PNG?", answer: "BMP here is stored uncompressed — every pixel is written directly as 24-bit color, with no compression applied. That makes it simple and lossless, but large." }, { question: "Does this support transparency?", answer: "No — pages are rendered on a white background and saved as 24-bit BMP without an alpha channel, matching how a printed page looks." }, { question: "Is my file uploaded anywhere?", answer: "No — rendering and BMP encoding both happen entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
