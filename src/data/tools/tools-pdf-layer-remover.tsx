import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-layer-remover",
    navName: "PDF Layer Remover",
    navDescription: "Remove optional content layers from a PDF.",
    name: "PDF Layer Remover",
    description: "Strip a PDF's optional content group (layer) configuration so all content is always visible. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Layer Remover - Remove PDF Layers Online Free",
    seoDescription: "Free online PDF layer remover. Strip optional content group (OCG) layer configuration so every layer becomes always visible, entirely in your browser.",
    keywords: ["pdf layer remover", "remove pdf layers", "flatten pdf layers", "optional content group remover", "remove ocg pdf"],
    ogTitle: "PDF Layer Remover Online Free | ToolZoneX",
    ogDescription: "Strip a PDF's optional content group (layer) configuration so all content is always visible.",
    schemaName: "PDF Layer Remover",
    schemaDescription: "Strip a PDF's optional content group (layer) configuration so all content is always visible.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this delete content that was in a hidden layer?", answer: "No — nothing is deleted from the page content. Content that was hidden by default becomes visible, since there's no longer any layer configuration to hide it." }, { question: "What if my PDF has no layers?", answer: "The tool detects this and tells you there's nothing to remove — no file is altered or downloaded." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
