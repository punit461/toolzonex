import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-attachment-remover",
    navName: "PDF Attachment Remover",
    navDescription: "Remove embedded file attachments from a PDF.",
    name: "PDF Attachment Remover - Remove Embedded Files from PDF",
    description: "Remove all embedded file attachments from any PDF. Strips bundled files while keeping page content intact. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Attachment Remover - Remove Embedded Files from PDF",
    seoDescription: "Free online PDF attachment remover. Strip all embedded file attachments from a PDF — reduce file size and clean documents before sharing.",
    keywords: ["remove pdf attachments", "delete pdf attachments", "pdf attachment remover", "strip pdf files"],
    ogTitle: "PDF Attachment Remover - Remove Embedded Files from PDF | ToolZoneX",
    ogDescription: "Remove all embedded file attachments from any PDF. Free, private, runs entirely in your browser.",
    schemaName: "PDF Attachment Remover",
    schemaDescription: "Remove embedded file attachments from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this affect the page content?", answer: "No — only embedded file attachments are removed. All text, images, and formatting on each page remain unchanged." }, { question: "Can I save the attachments first?", answer: "Yes — use the PDF Attachment Extractor tool to download the embedded files before removing them here." }, { question: "Is my file uploaded anywhere?", answer: "No — the entire process runs in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
