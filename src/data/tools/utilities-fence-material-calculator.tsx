import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fence-material-calculator",
    navName: "Fence Material Calculator",
    navDescription: "Full fence materials list: panels, posts & more.",
    name: "Fence Material Calculator",
    description: "Calculate a fuller fence materials list — panels, posts, concrete bags, rails, and fasteners — from your fence's length and style.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HomeRepairServiceIcon fontSize="large" color="primary"/>,
    seoTitle: "Fence Material Calculator - Full Materials List",
    seoDescription: "Free fence material calculator. Get a full materials list — panels, posts, concrete bags, rails, and fasteners — for your fencing project.",
    keywords: ["fence material calculator", "fence materials list calculator", "fence concrete calculator", "fence building materials calculator", "how much fencing material do i need"],
    ogTitle: "Fence Material Calculator - Full Materials List | ToolZoneX",
    ogDescription: "Get a full fence materials list including panels, posts, concrete, rails, and fasteners.",
    schemaName: "Fence Material Calculator",
    schemaDescription: "Calculate a full fence materials list including panels, posts, concrete bags, rails, and fasteners.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How many bags of concrete does a fence post really need?", answer: "It depends on post size and hole depth, but 2 bags of ready-mix concrete per post is a commonly used rule of thumb for typical residential fence posts. Larger posts, deeper frost-line holes, or gate posts carrying extra weight often need more — adjust the field to match your post size and local frost depth requirements." }, { question: "What's the difference between this and the simpler Fence Calculator?", answer: "The Fence Calculator gives you just panel and post counts. This calculator adds the rest of a real shopping list on top of that — concrete for setting posts, rails if you're not using pre-made panels, and a rough fastener count — so you can order everything in one pass." }, { question: "Should I round the fastener and rail estimates up?", answer: "Yes — these are rough estimates based on your per-panel inputs. Buy a small surplus of rails and fasteners, since running short mid-installation usually costs more in a second trip than a modest overage would have." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
