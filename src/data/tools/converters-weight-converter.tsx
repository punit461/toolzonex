import ScaleIcon from '@mui/icons-material/Scale';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/weight-converter",
    navName: "Weight Converter",
    navDescription: "Convert kilograms, pounds, ounces & more.",
    name: "Weight Converter",
    description: "Convert kilograms, pounds, ounces & more.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ScaleIcon fontSize="large" color="primary"/>,
    seoTitle: "Weight Converter - Kilograms, Pounds, Ounces & More",
    seoDescription: "Free weight converter. Convert between kilograms, grams, pounds, ounces, metric tons, and carats.",
    keywords: ["weight converter", "kg to lbs", "pounds to kg", "grams to ounces", "mass converter"],
    ogTitle: "Weight Converter - Kilograms, Pounds, Ounces & More | ToolZoneX",
    ogDescription: "Free weight converter. Convert between kilograms, grams, pounds, ounces, metric tons, and carats.",
    schemaName: "WeightConverter",
    schemaDescription: "Free weight converter. Convert between kilograms, grams, pounds, ounces, metric tons, and carats.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
