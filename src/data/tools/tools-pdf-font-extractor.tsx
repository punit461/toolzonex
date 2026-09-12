import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-font-extractor",
    navName: "PDF Font Extractor",
    navDescription: "List fonts used in a PDF and whether they're embedded.",
    name: "PDF Font Extractor",
    description: "List every distinct font used in a PDF, its type, and whether it's embedded in the file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Font Extractor - Check PDF Fonts Online Free",
    seoDescription: "Free online PDF font extractor. See every font used in a PDF, its subtype, and whether it's embedded — entirely in your browser.",
    keywords: ["pdf font extractor", "extract fonts from pdf", "pdf embedded fonts checker", "pdf font info", "check pdf fonts"],
    ogTitle: "PDF Font Extractor Online Free | ToolZoneX",
    ogDescription: "List every distinct font used in a PDF, its type, and whether it's embedded in the file.",
    schemaName: "PDF Font Extractor",
    schemaDescription: "List every distinct font used in a PDF, its type, and whether it's embedded in the file.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I download the actual font file?", answer: "No — the public browser APIs available don't expose a reliable way to pull a clean, standalone font file out of a PDF, so this tool reports font information (name, type, embedded or not) instead." }, { question: "What does \"not embedded\" mean?", answer: "The PDF references a font by name without including its outline data, so the viewer substitutes a locally installed font, which can look different across devices." }, { question: "Is my file uploaded anywhere?", answer: "No — everything runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
