import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/flip-pdf-vertically",
    navName: "Flip PDF Vertically",
    navDescription: "Mirror every page top-to-bottom.",
    name: "Flip PDF Vertically - Mirror PDF Top-Bottom",
    description: "Mirror every page of a PDF vertically (top-to-bottom flip). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Flip PDF Vertically Online Free",
    seoDescription: "Mirror every page of a PDF vertically (top-to-bottom flip). Free, private, runs in your browser.",
    keywords: ["flip pdf vertically", "pdf vertical flip", "flip pdf upside down", "mirror pdf top bottom"],
    ogTitle: "Flip PDF Vertically Online Free | ToolZoneX",
    ogDescription: "Mirror every page of a PDF vertically (top-to-bottom flip). Free, private, runs in your browser.",
    schemaName: "Flip PDF Vertically",
    schemaDescription: "Mirror every page of a PDF vertically (top-to-bottom flip).",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this flip every page?", answer: "Yes — the vertical flip is applied uniformly to all pages." }, { question: "How is this different from rotating 180 degrees?", answer: "A 180-degree rotation flips both axes. A vertical flip only mirrors top-to-bottom, which produces a different result for asymmetric content." }, { question: "Is my file uploaded anywhere?", answer: "No — flipping happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
