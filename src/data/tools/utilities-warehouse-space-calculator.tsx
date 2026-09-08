import WarehouseIcon from '@mui/icons-material/Warehouse';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/warehouse-space-calculator",
    navName: "Warehouse Space Calculator",
    navDescription: "Floor space needed from pallets or inventory.",
    name: "Warehouse Space Calculator",
    description: "Calculate total warehouse floor space needed from pallet count and footprint (or a direct storage area) plus an aisle/clearance overhead percentage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WarehouseIcon fontSize="large" color="primary"/>,
    seoTitle: "Warehouse Space Calculator - Floor Space Needed",
    seoDescription: "Free warehouse space calculator. Enter pallet count and footprint or a storage area, plus aisle overhead, to find total warehouse floor space needed.",
    keywords: ["warehouse space calculator", "warehouse floor space calculator", "pallet storage calculator", "warehouse square footage calculator", "how much warehouse space do i need"],
    ogTitle: "Warehouse Space Calculator - Floor Space Needed | ToolZoneX",
    ogDescription: "Calculate total warehouse floor space needed from pallets or storage area.",
    schemaName: "Warehouse Space Calculator",
    schemaDescription: "Calculate total warehouse floor space needed from pallet count and footprint plus aisle/clearance overhead percentage.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What overhead percentage should I use?", answer: "30-40% is a common starting range for standard pallet racking with forklift aisles. Narrow-aisle or high-density storage (like drive-in racking) can push overhead lower, while operations needing wide forklift turning radii, staging areas, or heavy foot traffic often need more than 40%." }, { question: "What's a standard pallet footprint?", answer: "The most common U.S. pallet size is 40\" × 48\", which works out to about 13.3 sq ft. Euro pallets (1200mm × 800mm) are smaller, at roughly 10.3 sq ft. Adjust the footprint field to match the pallet size you actually use." }, { question: "Does this account for vertical stacking or racking height?", answer: "No — this calculates floor space (footprint) only. If you stack pallets or use multi-level racking, the same floor footprint can hold significantly more inventory, but the floor space required to support that footprint doesn't change." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
