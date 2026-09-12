import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-powerpoint",
    navName: "PDF to PowerPoint",
    navDescription: "Turn each PDF page into a slide image in a .pptx file.",
    name: "PDF to PowerPoint",
    description: "Convert a PDF into a real .pptx presentation with each page rendered as a full-slide image. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to PowerPoint Converter - Convert PDF to PPTX Free",
    seoDescription: "Free online PDF to PowerPoint converter. Turn each PDF page into a full-slide image inside a real .pptx file, entirely in your browser.",
    keywords: ["pdf to powerpoint", "pdf to ppt", "convert pdf to pptx", "pdf to powerpoint converter free", "pdf to slides online"],
    ogTitle: "PDF to PowerPoint Converter Online Free | ToolZoneX",
    ogDescription: "Convert a PDF into a real .pptx presentation with each page rendered as a full-slide image.",
    schemaName: "PDF to PowerPoint",
    schemaDescription: "Convert a PDF into a real .pptx presentation with each page rendered as a full-slide image.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I edit the text on each slide afterward?", answer: "No — each slide contains a single image of the original page, not editable text boxes or shapes. To get editable text, use the PDF to Text tool separately and rebuild your slide content manually." }, { question: "Is the output a real .pptx file?", answer: "Yes — it's a genuinely valid PowerPoint Open XML presentation that opens natively in PowerPoint, Google Slides, and LibreOffice Impress, not a renamed image archive." }, { question: "Will the slide look exactly like the PDF page?", answer: "Visually, yes — each page is rendered at high resolution and fit to the slide, preserving its exact appearance." }, { question: "Is my file uploaded anywhere?", answer: "No — rendering and presentation creation both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
