import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/volume-converter",
    navName: "Volume Converter",
    navDescription: "Convert liters, gallons, cups & more.",
    name: "Volume Converter",
    description: "Convert liters, gallons, cups & more.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <LocalDrinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Volume Converter - Liters, Gallons, Cups & More",
    seoDescription: "Free volume converter. Convert between liters, milliliters, cubic meters, US gallons, quarts, pints, cups, and fluid ounces.",
    keywords: ["volume converter", "liters to gallons", "cups to ml", "gallons to liters", "volume unit converter"],
    ogTitle: "Volume Converter - Liters, Gallons, Cups & More | ToolZoneX",
    ogDescription: "Free volume converter. Convert between liters, milliliters, cubic meters, US gallons, quarts, pints, cups, and fluid ounces.",
    schemaName: "VolumeConverter",
    schemaDescription: "Free volume converter. Convert between liters, milliliters, cubic meters, US gallons, quarts, pints, cups, and fluid ounces.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
