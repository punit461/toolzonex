import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-transparency-flattener",
    navName: "PDF Transparency Flattener",
    navDescription: "Flatten transparent elements into an opaque PDF.",
    name: "PDF Transparency Flattener",
    description: "Flatten transparent and semi-transparent elements in a PDF onto a solid white background. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Transparency Flattener - Flatten PDF Layers Online Free",
    seoDescription: "Free online PDF transparency flattener. Bake transparent overlays and shadows onto an opaque white background, entirely in your browser.",
    keywords: ["pdf transparency flattener", "flatten pdf transparency", "remove pdf transparency", "opaque pdf converter", "pdf flatten layers"],
    ogTitle: "PDF Transparency Flattener Online Free | ToolZoneX",
    ogDescription: "Flatten transparent and semi-transparent elements in a PDF onto a solid white background.",
    schemaName: "PDF Transparency Flattener",
    schemaDescription: "Flatten transparent and semi-transparent elements in a PDF onto a solid white background.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What exactly does \"flatten transparency\" mean here?", answer: "Every page is rendered to a fixed image against a white background, so any semi-transparent regions are baked into their final composited color, leaving no transparency objects in the output." }, { question: "Will the background always be white?", answer: "Yes — this tool assumes a white page background, matching how most PDFs are meant to be viewed and printed." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
