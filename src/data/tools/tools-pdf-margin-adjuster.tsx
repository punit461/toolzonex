import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-margin-adjuster",
    navName: "PDF Margin Adjuster",
    navDescription: "Adjust top, right, bottom, and left margins of a PDF.",
    name: "PDF Margin Adjuster - Adjust PDF Margins Online",
    description: "Adjust the margins of every PDF page with separate control of each side, and preview the resulting page size. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Margin Adjuster - Adjust PDF Margins Online",
    seoDescription: "Adjust the margins of every PDF page with separate control of each side. Free, private, runs in your browser.",
    keywords: ["adjust pdf margins", "change pdf margins", "pdf margin tool", "modify pdf margins"],
    ogTitle: "PDF Margin Adjuster - Adjust PDF Margins Online | ToolZoneX",
    ogDescription: "Adjust the margins of every PDF page with separate control of each side. Free, private, runs in your browser.",
    schemaName: "Pdf Margin Adjuster",
    schemaDescription: "Adjust the margins of PDF pages with separate control of each edge.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from our Add Margins tool?", answer: "This adjuster exposes all four edges separately and previews the resulting page dimensions, giving you finer control over each side." }, { question: "Does the text stay in place?", answer: "Yes — the content is shifted by the left and bottom margins so its position relative to the corner is preserved, and the page expands around it." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
