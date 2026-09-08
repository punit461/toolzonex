import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/shipping-cost-estimator",
    navName: "Shipping Cost Estimator",
    navDescription: "Small-parcel cost across Standard/Expedited/Overnight.",
    name: "Shipping Cost Estimator",
    description: "Estimate small-parcel shipping cost from package weight across Standard, Expedited, and Overnight service tiers using illustrative example rates.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <LocalShippingIcon fontSize="large" color="primary"/>,
    seoTitle: "Shipping Cost Estimator - Standard, Expedited & Overnight",
    seoDescription: "Free shipping cost estimator. Enter package weight to compare estimated Standard, Expedited, and Overnight small-parcel shipping cost.",
    keywords: ["shipping cost estimator", "parcel shipping cost calculator", "shipping rate calculator", "how much does shipping cost", "overnight shipping cost calculator"],
    ogTitle: "Shipping Cost Estimator - Standard, Expedited & Overnight | ToolZoneX",
    ogDescription: "Estimate small-parcel shipping cost from package weight across three common service tiers.",
    schemaName: "Shipping Cost Estimator",
    schemaDescription: "Estimate small-parcel shipping cost from package weight using illustrative base fee plus per-pound rates across Standard, Expedited, and Overnight tiers.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Are these real carrier rates?", answer: "No — the base fees and per-pound rates used here are illustrative example numbers meant for quick estimation, not the actual pricing of any specific carrier. Real rates depend on the carrier, package dimensions, origin/destination zone, fuel surcharges, and current promotions, so always check your carrier's live rate tool for an exact quote." }, { question: "How is this different from the Freight Cost Calculator?", answer: "The Freight Cost Calculator is built for large freight or LTL (less-than-truckload) shipments, which are billed on whichever is greater between actual weight and volumetric (dimensional) weight based on the shipment's dimensions. This tool is for smaller parcels and uses a simple weight-only tiered estimate — no dimensions needed." }, { question: "Why does Overnight cost so much more than Standard?", answer: "Faster service tiers require carriers to prioritize a shipment through express sorting and dedicated transport rather than the slower, more efficient bulk routing used for standard ground shipping, which is reflected in a higher base fee and per-pound rate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
