import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tile-grout-calculator",
    navName: "Tile Grout Calculator",
    navDescription: "Estimate grout needed for a tiling job.",
    name: "Tile Grout Calculator",
    description: "Estimate how much grout you need from tile area, tile size, and grout joint width and depth.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Tile Grout Calculator - Estimate Grout Needed",
    seoDescription: "Free tile grout calculator. Enter your tile area, tile size, and grout joint width and depth to estimate how much grout to buy.",
    keywords: ["tile grout calculator", "how much grout do i need", "grout calculator", "grout quantity calculator", "sanded grout calculator"],
    ogTitle: "Tile Grout Calculator - Estimate Grout Needed | ToolZoneX",
    ogDescription: "Estimate how much grout you need for a tiling job.",
    schemaName: "Tile Grout Calculator",
    schemaDescription: "Estimate grout volume and weight needed from tile area, tile size, and grout joint width and depth.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How accurate is this estimate?", answer: "This is a simplified DIY approximation, not a precision spec sheet figure. Actual grout consumption varies by product density (sanded vs. unsanded, epoxy vs. cementitious), how tightly the grout is packed into the joints, and application technique, so treat the result as a helpful estimate rather than an exact requirement." }, { question: "Should I round up when buying grout?", answer: "Yes — always round up to the next full bag or box size. This calculator already adds a 10% buffer on top of the raw calculated weight, but running short mid-job is far more disruptive than having a small amount left over." }, { question: "Does grout joint depth really matter that much?", answer: "Yes — grout volume scales directly with joint depth, which typically equals your tile's thickness. A thicker tile with a deeper joint uses noticeably more grout than a thin tile with a shallow joint, even at the same joint width and floor area." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
