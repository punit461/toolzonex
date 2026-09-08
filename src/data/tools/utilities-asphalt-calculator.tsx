import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/asphalt-calculator",
    navName: "Asphalt Calculator",
    navDescription: "Estimate asphalt tonnage from area and thickness.",
    name: "Asphalt Calculator - Estimate Asphalt Tonnage",
    description: "Calculate the volume and tonnage of asphalt needed from area, thickness, and mix density.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Asphalt Calculator - Estimate Asphalt Tonnage",
    seoDescription: "Free asphalt calculator. Enter length, width, thickness, and density to estimate the tons of hot mix asphalt needed for a driveway, lot, or road job.",
    keywords: ["asphalt calculator", "asphalt tonnage calculator", "how much asphalt do i need", "driveway asphalt calculator", "hot mix asphalt calculator"],
    ogTitle: "Asphalt Calculator - Estimate Asphalt Tonnage | ToolZoneX",
    ogDescription: "Estimate the tons of asphalt needed for your paving project.",
    schemaName: "Asphalt Calculator",
    schemaDescription: "Calculate the volume and tonnage of asphalt needed from area, thickness, and mix density.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What density should I use for asphalt?", answer: "The default of 145 lb/ft³ is a common average for compacted hot mix asphalt, but real mixes typically range from about 140 to 150 lb/ft³ depending on the aggregate and binder used — use your supplier's actual density figure for the most accurate order quantity." }, { question: "Does this account for compaction?", answer: "This calculates the volume and weight for your target compacted thickness. Loose asphalt takes up noticeably more volume before it's rolled and compacted, so if you're measuring loose material rather than ordering by finished thickness, add extra to account for that difference." }, { question: "How thick should my asphalt layer be?", answer: "Typical residential driveways use about 2 to 3 inches of surface asphalt over a compacted base, while roads and heavy-traffic areas need thicker structural layers — check local codes or a paving contractor for a thickness suited to your specific load requirements." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
