import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/courier-charge-calculator",
    navName: "Courier Charge Calculator",
    navDescription: "Estimate shipping cost by weight & distance.",
    name: "Courier Charge Calculator",
    description: "Estimate courier shipping cost in USD from package weight, distance, and service type, with tiered distance rates and a fuel surcharge option.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalShippingIcon fontSize="large" color="primary"/>,
    seoTitle: "Courier Charge Calculator - Shipping Cost by Weight & Distance",
    seoDescription: "Free courier charge calculator. Estimate shipping cost in USD from package weight, distance, and service type with tiered distance rates and fuel surcharge.",
    keywords: ["courier charge calculator", "shipping cost calculator", "delivery cost calculator", "shipping estimate", "courier price", "parcel shipping cost", "fuel surcharge"],
    ogTitle: "Courier Charge Calculator - Shipping Cost by Weight & Distance | ToolZoneX",
    ogDescription: "Estimate courier shipping cost from weight, distance, and service, with tiered distance rates and a fuel surcharge.",
    schemaName: "Courier Charge Calculator",
    schemaDescription: "Estimate courier shipping cost from package weight, distance, and service type, with tiered distance rates.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does the fuel surcharge do?", answer: "Carriers pass on fuel price changes as a percentage added to the base shipping cost. Enter your carrier's current surcharge rate to see its effect." }, { question: "Why does long-distance shipping get cheaper per km?", answer: "Fixed costs like pickup and handling are covered by the base and weight charges, so the per-km marginal cost falls over longer hauls." }, { question: "Is this an official pricing quote?", answer: "No — it's an estimate based on illustrative rates. Confirm with your carrier for an exact quote." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
