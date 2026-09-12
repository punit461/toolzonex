import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/flip-pdf-horizontally",
    navName: "Flip PDF Horizontally",
    navDescription: "Mirror every page left-to-right.",
    name: "Flip PDF Horizontally - Mirror PDF Left-Right",
    description: "Mirror every page of a PDF horizontally (left-to-right flip). Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <SwapHorizIcon fontSize="large" color="primary"/>,
    seoTitle: "Flip PDF Horizontally Online Free",
    seoDescription: "Mirror every page of a PDF horizontally (left-to-right flip). Free, private, runs in your browser.",
    keywords: ["flip pdf horizontally", "mirror pdf", "pdf horizontal flip", "reverse pdf left right"],
    ogTitle: "Flip PDF Horizontally Online Free | ToolZoneX",
    ogDescription: "Mirror every page of a PDF horizontally (left-to-right flip). Free, private, runs in your browser.",
    schemaName: "Flip PDF Horizontally",
    schemaDescription: "Mirror every page of a PDF horizontally (left-to-right flip).",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this flip every page?", answer: "Yes — the horizontal flip is applied to all pages in the file." }, { question: "Will text become unreadable?", answer: "The text itself is mirrored, so left-to-right languages will appear backwards. Use this to correct a page that was already reversed." }, { question: "Is my file uploaded anywhere?", answer: "No — flipping happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
