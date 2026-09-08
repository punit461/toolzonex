import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-safe-print-optimizer",
    navName: "PDF Safe Print Optimizer",
    navDescription: "Add a safety margin so nothing gets clipped when printing.",
    name: "PDF Safe Print Optimizer",
    description: "Shrink each page's content inward by an adjustable safety margin so nothing gets clipped by printers that can't print edge-to-edge. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Safe Print Optimizer - Add Print Safety Margin Free",
    seoDescription: "Free online PDF safe print optimizer. Scale page content down and center it with a safety margin so printers don't clip your content, entirely in your browser.",
    keywords: ["pdf safe print optimizer", "pdf print margin", "prevent pdf clipping when printing", "pdf print safe area", "pdf border for printing"],
    ogTitle: "PDF Safe Print Optimizer Online Free | ToolZoneX",
    ogDescription: "Shrink each page's content inward by an adjustable safety margin so nothing gets clipped by printers that can't print edge-to-edge.",
    schemaName: "PDF Safe Print Optimizer",
    schemaDescription: "Shrink each page's content inward by an adjustable safety margin so nothing gets clipped by printers that can't print edge-to-edge.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this change my page size?", answer: "No — output pages are the same size as the input. Only the content is scaled down and centered within that same page size." }, { question: "Is my text still selectable afterward?", answer: "Yes — this tool keeps your original page content as vector/text data; it's simply scaled and repositioned, not converted to an image." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
