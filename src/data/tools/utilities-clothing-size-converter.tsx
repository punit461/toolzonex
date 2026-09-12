import CheckroomIcon from '@mui/icons-material/Checkroom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/clothing-size-converter",
    navName: "Clothing Size Converter",
    navDescription: "Convert clothing sizes between regions.",
    name: "Clothing Size Converter",
    description: "Convert men's and women's clothing sizes between US, UK, EU, and International S/M/L/XL sizing systems.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CheckroomIcon fontSize="large" color="primary"/>,
    seoTitle: "Clothing Size Converter - US, UK, EU & International Sizes",
    seoDescription: "Free clothing size converter for men's and women's sizing between US, UK, EU, and International S/M/L/XL. Enter your size to see it converted.",
    keywords: ["clothing size converter", "clothing size chart", "us to eu clothing size", "international clothing size chart", "mens womens clothing size converter"],
    ogTitle: "Clothing Size Converter - US, UK, EU & International | ToolZoneX",
    ogDescription: "Convert clothing sizes between US, UK, EU, and International sizing.",
    schemaName: "Clothing Size Converter",
    schemaDescription: "Convert men's and women's clothing sizes between US, UK, EU, and International S/M/L/XL sizing systems.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why do men's and women's sizes use different charts?", answer: "Men's and women's clothing is cut to different body proportions and follows separate, largely unrelated numbering conventions in most sizing systems — a \"size 8\" in women's clothing has no direct relationship to any men's size, which is why this tool keeps the two charts completely separate." }, { question: "Why does the same size vary between brands?", answer: "Clothing sizing isn't tightly regulated, and brands frequently use their own fit models and measurements — a phenomenon often called \"vanity sizing.\" This converter uses widely referenced standard charts as a reliable starting point, but always check a specific brand's own size chart when possible for the most accurate fit." }, { question: "Is International sizing the same everywhere?", answer: "Roughly, but not exactly — International S/M/L/XL labels are a simplified, widely used convention rather than a single global legal standard, so exact measurements behind each letter size can still vary somewhat by brand and country." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
