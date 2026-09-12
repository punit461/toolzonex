import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/area-converter",
    navName: "Area Converter",
    navDescription: "Convert square meters, acres, hectares & more.",
    name: "Area Converter",
    description: "Convert square meters, acres, hectares & more.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "Area Converter - Square Meters, Acres, Hectares & More",
    seoDescription: "Free area converter. Convert between square meters, square kilometers, hectares, acres, square feet, and more.",
    keywords: ["area converter", "sq meters to sq feet", "acres to hectares", "area unit converter", "square feet converter"],
    ogTitle: "Area Converter - Square Meters, Acres, Hectares & More | ToolZoneX",
    ogDescription: "Free area converter. Convert between square meters, square kilometers, hectares, acres, square feet, and more.",
    schemaName: "AreaConverter",
    schemaDescription: "Free area converter. Convert between square meters, square kilometers, hectares, acres, square feet, and more.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
