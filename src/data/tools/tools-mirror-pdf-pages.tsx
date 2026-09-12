import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/mirror-pdf-pages",
    navName: "Mirror PDF Pages",
    navDescription: "Create a mirror/spread layout from PDF pages.",
    name: "Mirror PDF Pages - Create Mirror Layout Online",
    description: "Create a mirror layout by placing each page alongside a horizontally flipped copy. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Mirror PDF Pages - Create Mirror Layout Online",
    seoDescription: "Free online tool to mirror PDF pages. Create a spread layout with original and horizontally flipped copies side by side.",
    keywords: ["mirror pdf pages", "pdf mirror layout", "create pdf spread", "pdf reflection"],
    ogTitle: "Mirror PDF Pages - Create Mirror Layout Online | ToolZoneX",
    ogDescription: "Create a mirror layout from PDF pages. Free, private, runs in your browser.",
    schemaName: "Mirror PDF Pages",
    schemaDescription: "Create a mirror layout by placing each page alongside a horizontally flipped copy.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this work with multi-page PDFs?", answer: "Yes — each page becomes its own double-width spread with a mirrored right side." }, { question: "Will the page size change?", answer: "The output pages are double the original width to accommodate both the original and mirrored copy side by side." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
