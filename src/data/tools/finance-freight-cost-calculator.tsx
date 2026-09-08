import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/freight-cost-calculator",
    navName: "Freight Cost Calculator",
    navDescription: "Freight cost using volumetric or actual weight.",
    name: "Freight Cost Calculator",
    description: "Calculate freight shipping cost from shipment dimensions and actual weight, billing on whichever is greater between actual and volumetric (dimensional) weight.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <LocalShippingIcon fontSize="large" color="primary"/>,
    seoTitle: "Freight Cost Calculator - Volumetric & Actual Weight Billing",
    seoDescription: "Free freight cost calculator. Enter shipment dimensions, actual weight, and rate per unit to calculate volumetric weight and total freight cost.",
    keywords: ["freight cost calculator", "volumetric weight calculator", "dimensional weight calculator", "freight shipping cost calculator", "chargeable weight calculator"],
    ogTitle: "Freight Cost Calculator - Volumetric & Actual Weight Billing | ToolZoneX",
    ogDescription: "Calculate freight shipping cost from shipment dimensions and actual weight.",
    schemaName: "Freight Cost Calculator",
    schemaDescription: "Calculate freight shipping cost from shipment dimensions and actual weight, billing on whichever is greater between actual and volumetric weight.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is volumetric (dimensional) weight, and why does it exist?", answer: "Volumetric weight estimates how much space a shipment takes up relative to its actual weight. Carriers use it because a truck, plane, or container has limited space — a large, light box can cost the carrier more in lost capacity than a small, heavy one of the same actual weight, so billing on whichever weight is greater keeps pricing fair to the carrier." }, { question: "Why do the two common divisors (5000 and 139) differ?", answer: "They're the same underlying conversion factor expressed in different unit systems — 5000 is used with centimeters and kilograms, while 139 is the equivalent factor for inches and pounds. Some carriers and freight modes (air vs. ocean vs. road) may use other divisors, so always confirm the exact figure with your carrier." }, { question: "How is this different from a small-parcel courier calculator?", answer: "A courier or small-parcel calculator usually just multiplies actual weight and distance by a flat or tiered rate. Freight billing specifically accounts for dimensional weight because freight shipments are often bulkier relative to their weight — this calculator adds that volumetric-weight comparison, which a simple parcel calculator doesn't need." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
