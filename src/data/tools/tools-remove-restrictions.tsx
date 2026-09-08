import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/remove-restrictions",
    navName: "Remove PDF Restrictions",
    navDescription: "Remove printing, copying, and editing restrictions.",
    name: "Remove PDF Restrictions Online Free",
    description: "Remove printing, copying, editing, and annotation restrictions from a PDF. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove PDF Restrictions Online Free",
    seoDescription: "Remove printing, copying, editing, and annotation restrictions from a PDF. Free, private, runs entirely in your browser.",
    keywords: ["remove pdf restrictions", "unlock pdf restrictions", "pdf restriction remover", "enable pdf editing"],
    ogTitle: "Remove PDF Restrictions Online Free | ToolZoneX",
    ogDescription: "Remove printing, copying, editing, and annotation restrictions from a PDF. Free, private, runs entirely in your browser.",
    schemaName: "Remove PDF Restrictions",
    schemaDescription: "Remove printing, copying, editing, and annotation restrictions from a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Do I need the owner password?", answer: "If the PDF has an owner password, you must provide it. If no owner password was set, restrictions can be removed directly." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing happens in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
