import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/rebar-calculator",
    navName: "Rebar Calculator",
    navDescription: "Calculate rebar pieces needed for a slab grid.",
    name: "Rebar Calculator - Slab Rebar Grid Estimator",
    description: "Calculate the number of rebar pieces and total length needed for a slab, from slab dimensions and rebar spacing.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Rebar Calculator - Slab Rebar Grid Estimator",
    seoDescription: "Free rebar calculator. Enter slab length, width, and rebar spacing to estimate the number of rebar pieces and total length needed.",
    keywords: ["rebar calculator", "rebar spacing calculator", "concrete rebar calculator", "how much rebar do i need", "slab rebar grid calculator"],
    ogTitle: "Rebar Calculator | ToolZoneX",
    ogDescription: "Estimate rebar pieces and length needed for a concrete slab.",
    schemaName: "Rebar Calculator",
    schemaDescription: "Calculate the number of rebar pieces and total length needed for a slab, from slab dimensions and rebar spacing.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this include overlap for splicing bars?", answer: "No — this calculates the straight total length before adding any lap splice overlap. When two rebar pieces need to be joined end-to-end, they're typically overlapped by roughly 12 to 24 times the bar diameter (check your local code or engineer's spec), so add extra length to your order to cover those splices." }, { question: "What spacing should I use?", answer: "Residential slabs commonly use 12 to 18 inches on-center spacing, but the right spacing depends on the slab's thickness, expected load, and local building code — check project-specific structural drawings or consult an engineer for anything load-bearing." }, { question: "What if I need different spacing in each direction?", answer: "This calculator assumes the same spacing in both directions to form a square grid. If your project calls for different spacing along the length versus the width, run the calculation twice — once for each direction's spacing — and combine the results." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
