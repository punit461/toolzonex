import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pallet-load-calculator",
    navName: "Pallet Load Calculator",
    navDescription: "Boxes per layer and total per pallet.",
    name: "Pallet Load Calculator",
    description: "Calculate how many boxes fit per layer and per pallet from pallet dimensions (US, EU, or custom presets), box dimensions, and maximum stack height.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Pallet Load Calculator - Boxes Per Pallet",
    seoDescription: "Free pallet load calculator. Enter pallet preset (US/EU/custom), box dimensions, and max stack height to calculate boxes per layer and total per pallet.",
    keywords: ["pallet load calculator", "boxes per pallet calculator", "pallet loading calculator", "pallet capacity calculator", "how many boxes fit on a pallet"],
    ogTitle: "Pallet Load Calculator - Boxes Per Pallet | ToolZoneX",
    ogDescription: "Calculate how many boxes fit per layer and per pallet from pallet and box dimensions.",
    schemaName: "Pallet Load Calculator",
    schemaDescription: "Calculate how many boxes fit per layer and per pallet from pallet dimensions, box dimensions, and maximum stack height.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this account for optimal 3D bin-packing?", answer: "No — this uses a simple grid-fit calculation per layer, checking both flat box orientations on the pallet footprint, not full 3D bin-packing optimization (which can sometimes interlock or offset boxes to squeeze in extra units). Treat the result as a solid practical estimate, not an absolute maximum." }, { question: "Why check both box orientations?", answer: "Rotating a box 90° on the pallet footprint often fits a different number of boxes per layer — picking the better of the two orientations gives a more realistic and efficient loading estimate than assuming just one fixed orientation." }, { question: "What should I use for maximum stack height?", answer: "Use whichever is more restrictive: your storage racking height, trailer or container interior height, or a safe handling height limit, typically minus the height of the pallet itself if that matters for your use case." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
