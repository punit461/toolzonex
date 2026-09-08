import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tile-calculator",
    navName: "Tile Calculator",
    navDescription: "Number of tiles needed for a room.",
    name: "Tile Calculator - How Many Tiles Do I Need",
    description: "Calculate the number of tiles needed for a room from room area, tile size, and a waste/breakage allowance.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Tile Calculator - How Many Tiles Do I Need",
    seoDescription: "Free tile calculator. Enter room dimensions, tile size, and waste percentage to find exactly how many tiles you need to buy.",
    keywords: ["tile calculator", "how many tiles do i need", "tile calculator for floor", "tile quantity calculator", "tiles needed calculator"],
    ogTitle: "Tile Calculator - How Many Tiles Do I Need | ToolZoneX",
    ogDescription: "Calculate how many tiles you need for your room.",
    schemaName: "Tile Calculator",
    schemaDescription: "Calculate the number of tiles needed for a room from room area, tile size, and a waste/breakage allowance.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why add a waste percentage?", answer: "Tiles get cut to fit room edges, corners, and around fixtures, and some break during installation. A 10% waste allowance is a common default for straightforward layouts — diagonal patterns, intricate layouts, or rooms with many cuts may need 15% or more." }, { question: "Should I round the result up?", answer: "Yes — always round up to the next whole tile (and often to the next full box, since tiles are typically sold by the box), since you can't buy a fraction of a tile." }, { question: "Does this account for grout lines?", answer: "No — grout line width is small enough relative to typical tile sizes that it's usually absorbed into the waste percentage rather than calculated separately." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
