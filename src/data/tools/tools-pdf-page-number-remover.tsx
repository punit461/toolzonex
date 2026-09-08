import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-page-number-remover",
    navName: "PDF Page Number Remover",
    navDescription: "Cover the page-number area on every page with white.",
    name: "PDF Page Number Remover",
    description: "Cover a chosen region on every page — where page numbers typically sit — with a solid white rectangle. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Page Number Remover - Hide Page Numbers Online Free",
    seoDescription: "Free online PDF page number remover. Cover the page-number region on every page with white, entirely in your browser.",
    keywords: ["pdf page number remover", "remove page numbers from pdf", "delete page numbers pdf", "hide pdf page numbers", "pdf footer remover"],
    ogTitle: "PDF Page Number Remover Online Free | ToolZoneX",
    ogDescription: "Cover a chosen region on every page — where page numbers typically sit — with a solid white rectangle.",
    schemaName: "PDF Page Number Remover",
    schemaDescription: "Cover a chosen region on every page — where page numbers typically sit — with a solid white rectangle.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this detect and delete the page-number text itself?", answer: "No — it covers the region with an opaque white rectangle. The underlying text isn't deleted, just visually hidden underneath it." }, { question: "Will it also cover other footer content in that spot?", answer: "Yes — anything within the selected rectangle gets covered too, since the tool can't distinguish a page number from other nearby text." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
