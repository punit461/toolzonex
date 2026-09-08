import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fuse-size-calculator",
    navName: "Fuse Size Calculator",
    navDescription: "Recommended fuse rating from load current.",
    name: "Fuse Size Calculator",
    description: "Calculate a recommended fuse size from full load current using the standard 125% continuous-load safety margin.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricalServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Fuse Size Calculator - Recommended Fuse Rating",
    seoDescription: "Free fuse size calculator. Enter full load current to find the recommended fuse rating using the 125% safety margin rule.",
    keywords: ["fuse size calculator", "fuse rating calculator", "what size fuse do i need", "fuse amperage calculator", "125% continuous load fuse"],
    ogTitle: "Fuse Size Calculator - Recommended Fuse Rating | ToolZoneX",
    ogDescription: "Calculate a recommended fuse size from full load current using the 125% safety margin rule.",
    schemaName: "Fuse Size Calculator",
    schemaDescription: "Calculate a recommended fuse size from full load current using the standard 125% continuous-load safety margin.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this a substitute for a licensed electrician?", answer: "No — this is a general estimate based on the common 125% continuous-load rule of thumb. Actual fuse and breaker sizing must comply with local electrical code, wire gauge ampacity ratings, and equipment-specific requirements, so always confirm with a qualified electrician for real installations." }, { question: "Why 125% and not the exact load current?", answer: "Continuous loads (running 3 hours or more) generate heat over time, and electrical code typically requires a 25% safety margin above the load's rated current to prevent nuisance tripping and reduce fire risk from sustained near-capacity operation." }, { question: "What if my exact calculated value falls between two standard sizes?", answer: "Always round up to the next larger standard fuse size, never down — an undersized fuse can trip under normal operation, while rounding up keeps you within the safety margin the 125% rule is designed to provide." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
