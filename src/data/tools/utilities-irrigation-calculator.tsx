import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/irrigation-calculator",
    navName: "Irrigation Calculator",
    navDescription: "Watering time and water volume needed.",
    name: "Irrigation Calculator",
    description: "Calculate watering time and total water volume needed for a garden or lawn from its area, weekly water requirement, and sprinkler flow rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "Irrigation Calculator - Watering Time & Water Volume",
    seoDescription: "Free irrigation calculator. Enter garden or lawn area, weekly water requirement, and sprinkler flow rate to calculate watering time and water volume.",
    keywords: ["irrigation calculator", "sprinkler watering time calculator", "lawn watering calculator", "garden water requirement calculator", "how long to water lawn"],
    ogTitle: "Irrigation Calculator - Watering Time & Water Volume | ToolZoneX",
    ogDescription: "Calculate watering time and total water volume needed for a garden or lawn.",
    schemaName: "Irrigation Calculator",
    schemaDescription: "Calculate watering time and total water volume needed for a garden or lawn from its area, weekly water requirement, and sprinkler flow rate.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is 1 inch of water per week always correct?", answer: "It's a commonly cited average for many lawns and gardens, but actual needs vary by grass or plant type, soil drainage, rainfall, temperature, and season — hot, dry periods often need more, while cooler or rainy periods need less. Adjust the water depth input to match your specific situation." }, { question: "Should I water in one long session or split it up?", answer: "This calculator gives the total time needed for the full weekly amount — many gardeners split that total across two or three shorter sessions per week rather than one long watering, which can help water soak in more effectively and reduce runoff, especially on compacted or sloped soil." }, { question: "How do I find my sprinkler's flow rate?", answer: "Check the manufacturer's spec sheet, or measure it yourself by timing how long it takes to fill a container of known volume (like a 5-gallon bucket) from the sprinkler head, then converting to a per-minute rate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
