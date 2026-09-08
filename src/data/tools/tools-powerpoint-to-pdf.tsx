import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/powerpoint-to-pdf",
    navName: "PowerPoint to PDF",
    navDescription: "Extract embedded slide images from a .pptx into a PDF.",
    name: "PowerPoint to PDF",
    description: "Extract the embedded images from a .pptx presentation's slides into a PDF, one page per image. Text boxes and shapes aren't rendered. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PowerPoint to PDF Converter - Convert PPTX to PDF Free",
    seoDescription: "Free online PowerPoint to PDF converter. Extract embedded images from a .pptx presentation's slides into a PDF, entirely in your browser.",
    keywords: ["powerpoint to pdf", "ppt to pdf", "convert pptx to pdf", "powerpoint to pdf converter free", "pptx to pdf online"],
    ogTitle: "PowerPoint to PDF Converter Online Free | ToolZoneX",
    ogDescription: "Extract the embedded images from a .pptx presentation's slides into a PDF, one page per image.",
    schemaName: "PowerPoint to PDF",
    schemaDescription: "Extract the embedded images from a .pptx presentation's slides into a PDF, one page per image.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will typed text and shapes appear in the PDF?", answer: "No — only embedded raster images (PNG/JPEG) are extracted. Text boxes, shapes, charts, and vector graphics drawn directly in PowerPoint are not rendered." }, { question: "What if a slide has multiple images?", answer: "Each embedded image becomes its own PDF page — if a slide contains a background photo plus a separate logo image, that becomes two pages rather than one combined slide." }, { question: "Does this work with .ppt (the older format)?", answer: "No — only the modern .pptx (Open XML) format is supported, since it's a ZIP archive this tool can unpack. The legacy binary .ppt format isn't supported." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
