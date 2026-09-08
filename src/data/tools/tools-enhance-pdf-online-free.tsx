import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/enhance-pdf-online-free",
    navName: "Enhance PDF Online",
    navDescription: "Improve PDF quality by re-rendering at higher resolution.",
    name: "Enhance PDF Online",
    description: "Enhance PDF quality by re-rendering every page at a higher resolution.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <AutoAwesomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Enhance PDF Online Free - Improve PDF Quality",
    seoDescription: "Free online PDF enhancement tool to improve document quality by re-rendering pages at higher resolution. Choose Standard, High, or Ultra levels.",
    keywords: ["enhance pdf", "improve pdf quality", "pdf enhancement", "pdf quality booster"],
    ogTitle: "Enhance PDF Online Free - Improve PDF Quality | ToolZoneX",
    ogDescription: "Free online PDF enhancement tool to improve document quality by re-rendering at higher resolution.",
    schemaName: "Enhance PDF Online",
    schemaDescription: "Enhance PDF quality by re-rendering every page at a higher resolution.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this make my PDF text selectable?", answer: "No — this tool re-renders pages as images embedded in a new PDF. The original text layer is not preserved." }, { question: "Why is the enhanced file larger?", answer: "Higher resolution means more pixel data per page. Ultra (4×) can produce files 8–16× larger than the original." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
