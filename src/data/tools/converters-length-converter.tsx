import StraightenIcon from '@mui/icons-material/Straighten';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/length-converter",
    navName: "Length Converter",
    navDescription: "Convert meters, feet, miles, inches & more.",
    name: "Length Converter",
    description: "Convert meters, feet, miles, inches & more.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <StraightenIcon fontSize="large" color="primary"/>,
    seoTitle: "Length Converter - Meters, Feet, Miles, Inches & More",
    seoDescription: "Free length converter. Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and light years.",
    keywords: ["length converter", "meters to feet", "cm to inches", "km to miles", "unit converter length", "distance converter"],
    ogTitle: "Length Converter - Meters, Feet, Miles, Inches & More | ToolZoneX",
    ogDescription: "Free length converter. Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and light years.",
    schemaName: "LengthConverter",
    schemaDescription: "Free length converter. Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and light years.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
