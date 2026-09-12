import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-thumbnail-generator",
    navName: "PDF Thumbnail Generator",
    navDescription: "Generate thumbnail previews for every page in a PDF.",
    name: "PDF Thumbnail Generator - Create PDF Page Previews Online",
    description: "Generate PNG thumbnail previews for every page in a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Thumbnail Generator - Create PDF Page Previews Online",
    seoDescription: "Generate PNG thumbnail previews for every page in a PDF. Free, private, runs entirely in your browser.",
    keywords: ["pdf thumbnail", "pdf page preview", "generate pdf thumbnails", "pdf miniatures"],
    ogTitle: "PDF Thumbnail Generator - Create PDF Page Previews Online | ToolZoneX",
    ogDescription: "Generate PNG thumbnail previews for every page in a PDF. Free, private, runs entirely in your browser.",
    schemaName: "PDF Thumbnail Generator",
    schemaDescription: "Generate PNG thumbnail previews for every page in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What resolution are the thumbnails?", answer: "Each thumbnail is rendered at 260 pixels wide with the page aspect ratio preserved." }, { question: "Is my file uploaded anywhere?", answer: "No — all rendering happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
