import FullscreenIcon from '@mui/icons-material/Fullscreen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/resize-and-rescale-pdf-online",
    navName: "Resize & Rescale PDF",
    navDescription: "Scale all pages by a percentage from 50% to 200%.",
    name: "Resize & Rescale PDF Online",
    description: "Resize and rescale all pages in a PDF by a percentage, from 50% to 200% of the original dimensions.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <FullscreenIcon fontSize="large" color="primary"/>,
    seoTitle: "Resize & Rescale PDF Online Free",
    seoDescription: "Free online PDF resizer to scale all pages by a percentage from 50% to 200%. Proportionally resize your PDF document while preserving layout.",
    keywords: ["resize pdf", "scale pdf", "pdf resizer", "change pdf size"],
    ogTitle: "Resize & Rescale PDF Online Free | ToolZoneX",
    ogDescription: "Free online PDF resizer to scale all pages by a percentage from 50% to 200%.",
    schemaName: "Resize & Rescale PDF Online",
    schemaDescription: "Resize and rescale all pages in a PDF by a percentage.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this change the page dimensions or just the content?", answer: "Both — the page canvas and all content are scaled together, preserving the original layout at the new size." }, { question: "What happens to text quality?", answer: "Vector text remains sharp at any scale. Raster images within the PDF may appear softer when scaled up beyond their native resolution." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
