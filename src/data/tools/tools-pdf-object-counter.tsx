import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-object-counter",
    navName: "PDF Object Counter",
    navDescription: "Count pages, images, fonts, annotations & PDF objects.",
    name: "PDF Object Counter",
    description: "Count a PDF's pages, embedded images, fonts, annotations, links, and total indirect objects. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Object Counter - Count PDF Structure Online Free",
    seoDescription: "Free online PDF object counter. Count pages, embedded images, fonts, annotations, links, and total indirect objects, entirely in your browser.",
    keywords: ["pdf object counter", "count pdf objects", "pdf structure analyzer", "count images fonts pdf", "pdf indirect objects"],
    ogTitle: "PDF Object Counter Online Free | ToolZoneX",
    ogDescription: "Count a PDF's pages, embedded images, fonts, annotations, links, and total indirect objects.",
    schemaName: "PDF Object Counter",
    schemaDescription: "Count a PDF's pages, embedded images, fonts, annotations, links, and total indirect objects.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why might the image or font count seem low?", answer: "Counts are based on unique resources referenced in page resource dictionaries; reused images or fonts across pages are counted once, and non-standard embeddings may not be detected." }, { question: "What does \"total indirect PDF objects\" mean?", answer: "Every object in a PDF referenced by number — pages, fonts, images, annotations, and internal dictionaries and streams — counts as one indirect object, so it's typically much larger than any individual count above." }, { question: "Is my file uploaded anywhere?", answer: "No — everything runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
