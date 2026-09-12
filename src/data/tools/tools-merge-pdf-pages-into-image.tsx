import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/merge-pdf-pages-into-image",
    navName: "Merge PDF Pages into Image",
    navDescription: "Stack PDF pages into one image.",
    name: "Merge PDF Pages into Image",
    description: "Combine every page of a PDF into a single stacked image, vertically or horizontally. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Merge PDF Pages into One Image Online Free",
    seoDescription: "Free online tool to merge every page of a PDF into a single image. Choose vertical or horizontal stacking, then download as PNG.",
    keywords: ["merge pdf pages into image", "pdf pages to one image", "combine pdf pages image", "pdf to long image", "stack pdf pages"],
    ogTitle: "Merge PDF Pages into One Image Online Free | ToolZoneX",
    ogDescription: "Combine every page of a PDF into a single stacked image, vertically or horizontally.",
    schemaName: "Merge PDF Pages into Image",
    schemaDescription: "Combine every page of a PDF into a single stacked image, vertically or horizontally.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How large is the output image?", answer: "Pages are rendered at 800 pixels along the fixed dimension (width for vertical stacking, height for horizontal). Documents with many pages will produce a very large image in the other dimension." }, { question: "Does it preserve colors and images?", answer: "Yes — each page is rendered at full fidelity and combined without additional compression artifacts." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
