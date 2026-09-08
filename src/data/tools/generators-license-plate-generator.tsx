import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/license-plate-generator",
    navName: "License Plate Generator",
    navDescription: "Fictional plates for mockups & testing.",
    name: "License Plate Generator - Fictional Plates for Mockups",
    description: "Generate random fictional license plates in US-style, UK-style, or a generic international format, for mockups, testing, or creative use.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "License Plate Generator - Fictional Plates for Mockups & Testing",
    seoDescription: "Free license plate generator. Generate random fictional license plates in US, UK, or generic international format for mockups, testing, or creative use.",
    keywords: ["license plate generator", "random license plate generator", "fake license plate generator", "number plate generator", "plate mockup generator"],
    ogTitle: "License Plate Generator - Fictional Plates for Mockups | ToolZoneX",
    ogDescription: "Generate random fictional license plates in US, UK, or generic format.",
    schemaName: "License Plate Generator",
    schemaDescription: "Generate random fictional license plates in US-style, UK-style, or a generic international format, for mockups, testing, or creative use.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Are these real, registered license plates?", answer: "No — every plate is randomly generated fictional text for mockups, testing, or creative use. They are not checked against, and have no connection to, any real vehicle registration database." }, { question: "Can I use these plates in a design project or app?", answer: "Yes, that's exactly what they're for — but don't present a generated plate as belonging to a real vehicle or use it in any way that could imply a real association." }, { question: "Could a generated plate accidentally match a real one?", answer: "It's possible by pure chance, the same way any random string generator could coincidentally match something real. These plates are not sourced from or checked against any registry, so any resemblance is coincidental." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
