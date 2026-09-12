import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-tiff",
    navName: "PDF to TIFF",
    navDescription: "Convert PDF pages into a multi-page TIFF image.",
    name: "PDF to TIFF",
    description: "Convert a PDF into a single, uncompressed multi-page TIFF file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to TIFF Converter - Convert PDF to Multi-Page TIFF Free",
    seoDescription: "Free online PDF to TIFF converter. Convert a PDF into a single, uncompressed multi-page TIFF file, entirely in your browser.",
    keywords: ["pdf to tiff", "convert pdf to tiff", "pdf to tiff converter free", "multi-page tiff from pdf", "pdf to tif online"],
    ogTitle: "PDF to TIFF Converter Online Free | ToolZoneX",
    ogDescription: "Convert a PDF into a single, uncompressed multi-page TIFF file.",
    schemaName: "PDF to TIFF",
    schemaDescription: "Convert a PDF into a single, uncompressed multi-page TIFF file.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this one TIFF file per PDF, or one per page?", answer: "One multi-page TIFF file containing every page of the PDF, in order." }, { question: "Is the TIFF compressed?", answer: "No — this produces a baseline, uncompressed RGB TIFF, which keeps every pixel lossless at the cost of a larger file size than a compressed TIFF or PDF." }, { question: "Will my text stay selectable?", answer: "No — like any raster image format, TIFF has no text layer. Each page becomes a flat image." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion and encoding both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
