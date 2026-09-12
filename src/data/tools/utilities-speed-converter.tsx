import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/speed-converter",
    navName: "Speed Converter",
    navDescription: "Convert mph, km/h, m/s, knots & ft/s.",
    name: "Speed Converter - mph, km/h, m/s, Knots & ft/s",
    description: "Convert speed between miles per hour, kilometers per hour, meters per second, knots, and feet per second.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Speed Converter - mph, km/h, m/s, Knots & ft/s",
    seoDescription: "Free online speed converter. Convert between mph, km/h, m/s, knots, and feet per second instantly.",
    keywords: ["speed converter", "mph to kmh calculator", "knots to mph calculator", "speed unit conversion", "m/s to mph"],
    ogTitle: "Speed Converter - mph, km/h, m/s, Knots & ft/s | ToolZoneX",
    ogDescription: "Convert speed between mph, km/h, m/s, knots, and ft/s instantly.",
    schemaName: "Speed Converter",
    schemaDescription: "Convert speed between miles per hour, kilometers per hour, meters per second, knots, and feet per second.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a knot, exactly?", answer: "A knot is one nautical mile per hour. A nautical mile (1,852 meters) is based on one minute of latitude along a great circle of the Earth, which is why it doesn't divide evenly into miles or kilometers like other speed units do." }, { question: "Why do aviation and marine speeds use knots instead of mph?", answer: "Knots are tied directly to nautical miles, which correspond to minutes of latitude on navigational charts, making distance and speed calculations for navigation more straightforward than converting through miles or kilometers." }, { question: "How accurate are these conversion factors?", answer: "The factors used (for example, 1 mph = 0.44704 m/s exactly, and 1 knot = 0.5144444 m/s) are the internationally defined standard values, so results are accurate to the number of decimal places shown." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
