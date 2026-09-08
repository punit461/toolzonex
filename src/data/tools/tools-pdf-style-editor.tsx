import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-style-editor",
    navName: "PDF Style Editor",
    navDescription: "Change the visual style of PDF pages.",
    name: "PDF Style Editor - Change PDF Appearance Online",
    description: "Modify the visual style of PDF pages by adding a colored background. Choose any color and opacity. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Style Editor - Change PDF Appearance Online",
    seoDescription: "Free online PDF style editor. Change the background color and appearance of any PDF page. Choose color and opacity for a custom look.",
    keywords: ["edit pdf style", "pdf style editor", "change pdf appearance", "pdf background color"],
    ogTitle: "PDF Style Editor - Change PDF Appearance Online | ToolZoneX",
    ogDescription: "Modify the visual style of PDF pages by adding a colored background. Free, private, runs entirely in your browser.",
    schemaName: "PDF Style Editor",
    schemaDescription: "Change the visual style and background color of PDF pages.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will the color cover the text?", answer: "The rectangle is drawn behind existing content, so all text and images remain visible on top of the new background." }, { question: "Can I set different colors for different pages?", answer: "Not yet — the same color and opacity is applied to all pages in the current version." }, { question: "Is my file uploaded anywhere?", answer: "No — styling happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
