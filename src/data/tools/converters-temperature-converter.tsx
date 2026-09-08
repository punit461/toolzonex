import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/temperature-converter",
    navName: "Temperature Converter",
    navDescription: "Convert Celsius, Fahrenheit & Kelvin.",
    name: "Temperature Converter",
    description: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <DeviceThermostatIcon fontSize="large" color="primary"/>,
    seoTitle: "Temperature Converter - Celsius, Fahrenheit & Kelvin",
    seoDescription: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter", "c to f"],
    ogTitle: "Temperature Converter - Celsius, Fahrenheit & Kelvin | ToolZoneX",
    ogDescription: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
    schemaName: "TemperatureConverter",
    schemaDescription: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
