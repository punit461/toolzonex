import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cement-calculator",
    navName: "Cement Calculator",
    navDescription: "Estimate cement bags, sand and aggregate.",
    name: "Cement Calculator",
    description: "Estimate the cement bags, sand, and aggregate needed for a concrete mix. Free online cement calculator for slabs and footings.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HomeRepairServiceIcon fontSize="large" color="primary"/>,
    seoTitle: "Cement Calculator - Estimate Cement Bags, Sand & Aggregate",
    seoDescription: "Free online cement calculator. Enter your concrete volume and mix ratio to get cement bags required, plus sand and aggregate volumes for the dry mix.",
    keywords: ["cement calculator", "cement bags calculator", "concrete mix calculator", "how much cement do i need", "cement sand aggregate", "concrete ratio 1:2:4"],
    ogTitle: "Cement Calculator - Estimate Cement, Sand & Aggregate | ToolZoneX",
    ogDescription: "Estimate the cement bags, sand, and aggregate needed for any concrete mix.",
    schemaName: "Cement Calculator",
    schemaDescription: "Estimate the cement bags, sand, and aggregate needed for a concrete mix.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What is the 1.54 dry volume factor?", answer: "Wet concrete occupies less volume than the dry ingredients that make it — mixing, water absorption, and voids reduce the volume. Multiply the wet volume by about 1.54 to get the dry volume of cement, sand, and aggregate to order." }, { question: "What does the 1:2:4 mix ratio mean?", answer: "It is the cement : sand : aggregate ratio by volume — 1 part cement to 2 parts sand to 4 parts coarse aggregate. 1:2:4 is a common general-purpose mix (roughly M15 grade) used for slabs, beams, and columns." }, { question: "How many bags of cement does one cubic meter of concrete need?", answer: "For a 1:2:4 mix, one cubic meter of finished concrete takes roughly 8 × 50 kg bags of cement. The calculator works this out from your mix ratio and target volume." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
