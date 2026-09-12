import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/tracking-number-generator",
    navName: "Tracking Number Generator",
    navDescription: "Generate fictional carrier-style tracking numbers for mockups.",
    name: "Tracking Number Generator - Fictional Mockup Tracking Numbers",
    description: "Generate random, fictional tracking numbers matching UPS-style, FedEx-style, USPS-style, or generic carrier formats, for mockups and testing only.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocalShippingIcon fontSize="large" color="primary"/>,
    seoTitle: "Tracking Number Generator - Fictional Mockup Tracking Numbers",
    seoDescription: "Free online tracking number generator. Create fictional UPS-style, FedEx-style, USPS-style, or generic tracking numbers for mockups and testing.",
    keywords: ["tracking number generator", "fake tracking number generator", "fictional tracking number maker", "ups tracking number format", "mockup tracking number tool"],
    ogTitle: "Tracking Number Generator - Fictional Mockup Tracking Numbers | ToolZoneX",
    ogDescription: "Create fictional carrier-style tracking numbers for mockups and testing only.",
    schemaName: "Tracking Number Generator",
    schemaDescription: "Generate random, fictional tracking numbers matching UPS-style, FedEx-style, USPS-style, or generic carrier formats, for mockups and testing only.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Are these real, trackable tracking numbers?", answer: "No — every number is randomly generated and fictional, purely for mockup, testing, or design purposes. They have no connection to any actual shipment or carrier system and will not work if entered on a real carrier's tracking page." }, { question: "Do these pass a carrier's official validation check?", answer: "No — this tool only matches the typical length and character pattern (letters vs. digits) of each carrier's format. It does not implement any real carrier's internal checksum or validation algorithm." }, { question: "Which format should I pick for generic testing?", answer: "Use Generic if you just need a realistic-looking alphanumeric string without matching any specific real-world carrier's exact format." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
