import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-pdf-border",
    navName: "Remove PDF Border",
    navDescription: "Remove visible borders from PDF pages.",
    name: "Remove Border from PDF Pages Online Free",
    description: "Remove unwanted borders from PDF pages by covering the edge area with white. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Border from PDF Pages Online Free",
    seoDescription: "Free online tool to remove borders from PDF pages. Cover edge areas with white to clean up unwanted borders.",
    keywords: ["remove pdf border", "delete pdf border", "pdf border remover", "clear pdf borders"],
    ogTitle: "Remove Border from PDF Pages Online Free | ToolZoneX",
    ogDescription: "Remove unwanted borders from PDF pages. Free, private, runs in your browser.",
    schemaName: "Remove PDF Border",
    schemaDescription: "Remove unwanted borders from PDF pages by covering the edge area with white.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a \"point\"?", answer: "One PDF point equals 1/72 of an inch (≈ 0.35 mm). A 10-point border is roughly 3.5 mm thick." }, { question: "Will this cover content near the edges?", answer: "Yes — if your content extends into the border area, it will be covered. Use a smaller width value to avoid this." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
