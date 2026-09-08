import WarehouseIcon from '@mui/icons-material/Warehouse';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/warehouse-capacity-calculator",
    navName: "Warehouse Capacity Calculator",
    navDescription: "Pallet capacity from warehouse floor area.",
    name: "Warehouse Capacity Calculator",
    description: "Calculate how many pallets fit in a warehouse from total floor area, pallet footprint, and an aisle/clearance overhead percentage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WarehouseIcon fontSize="large" color="primary"/>,
    seoTitle: "Warehouse Capacity Calculator - Pallet Capacity by Area",
    seoDescription: "Free warehouse capacity calculator. Enter floor area, pallet footprint, and overhead percentage to calculate pallet capacity.",
    keywords: ["warehouse capacity calculator", "how many pallets fit in a warehouse", "warehouse pallet capacity calculator", "pallet capacity calculator", "warehouse storage capacity calculator"],
    ogTitle: "Warehouse Capacity Calculator - Pallet Capacity by Area | ToolZoneX",
    ogDescription: "Calculate how many pallets fit in a warehouse based on floor area, pallet footprint, and overhead.",
    schemaName: "Warehouse Capacity Calculator",
    schemaDescription: "Calculate usable storage area as total area times one minus overhead percentage, then pallet capacity as the floor of usable area divided by pallet footprint.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Warehouse Space Calculator?", answer: "The Warehouse Space Calculator answers \"how much space do I need to store X pallets\" — you give it a pallet count and it tells you the floor space required. This tool answers the reverse question — \"how many pallets can fit in a warehouse of Y square feet\" — you give it a floor area and it tells you the pallet capacity." }, { question: "What overhead percentage should I use?", answer: "30-40% is a common starting range for standard pallet racking with forklift aisles, similar to the Warehouse Space Calculator's guidance. Narrow-aisle or high-density storage can reduce this, while operations needing wide turning radii or large staging areas may need more." }, { question: "Does this account for vertical stacking or multi-level racking?", answer: "No — this calculates floor-level pallet capacity (footprint) only. If you stack pallets or use multi-level racking, the same floor footprint can hold significantly more total inventory than the pallet count shown here." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
