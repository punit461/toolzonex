import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fuel-split-calculator",
    navName: "Fuel Split Calculator",
    navDescription: "Split road-trip fuel cost by distance.",
    name: "Fuel Split Calculator",
    description: "Split a road trip's total fuel cost proportionally by the distance each person actually traveled in the vehicle.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalGasStationIcon fontSize="large" color="primary"/>,
    seoTitle: "Fuel Split Calculator - Split Road Trip Gas Cost by Distance",
    seoDescription: "Free fuel split calculator. Enter total fuel cost and each rider's distance traveled to split a road trip's gas cost fairly by distance.",
    keywords: ["fuel split calculator", "road trip fuel cost splitter", "gas cost splitter", "carpool fuel calculator", "split gas money calculator"],
    ogTitle: "Fuel Split Calculator - Split Road Trip Gas Cost by Distance | ToolZoneX",
    ogDescription: "Split a road trip's fuel cost proportionally by the distance each rider traveled.",
    schemaName: "Fuel Split Calculator",
    schemaDescription: "Split a road trip's total fuel cost proportionally among riders based on the distance each one traveled.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Split Bill Calculator?", answer: "The Split Bill Calculator is built for restaurant and group bills — splitting a total evenly or by itemized purchases, with tip handling. This tool is specifically for road-trip fuel costs, splitting proportionally by the actual distance each rider traveled, which matters when people join or leave partway through a trip." }, { question: "What if everyone rode the entire trip together?", answer: "Enter the same total trip distance for every person — with equal distances, the calculator naturally splits the fuel cost evenly among everyone, the same result you'd get from an even split." }, { question: "Should distance be one-way or round-trip?", answer: "Use whichever distance each person actually rode for — if someone only rode one leg of a round trip, enter just that leg's distance for them, while someone who rode the whole round trip enters the full round-trip distance." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
