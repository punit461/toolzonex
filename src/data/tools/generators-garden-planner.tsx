import YardIcon from '@mui/icons-material/Yard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/garden-planner",
    navName: "Garden Planner",
    navDescription: "Plan a planting & harvest schedule across the growing season.",
    name: "Garden Planner",
    description: "Add plants or crops with planting month, expected harvest month, and watering frequency, and get an organized planting schedule sorted by planting month.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <YardIcon fontSize="large" color="primary"/>,
    seoTitle: "Garden Planner - Planting & Harvest Schedule Maker",
    seoDescription: "Free garden planner. Build a planting and harvest timing schedule across the growing season with watering frequency.",
    keywords: ["garden planner", "planting schedule generator", "garden planting calendar", "vegetable garden planner", "harvest schedule maker"],
    ogTitle: "Garden Planner - Planting & Harvest Schedule Maker | ToolZoneX",
    ogDescription: "Build a planting and harvest timing schedule across the growing season.",
    schemaName: "Garden Planner",
    schemaDescription: "Add plants or crops with planting month, expected harvest month, and watering frequency, and get an organized planting schedule sorted by planting month.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Garden Bed Calculator or Seed Spacing Calculator?", answer: "Those tools handle physical layout and spacing math — how many beds fit in your plot, or how far apart to space seeds. This Garden Planner is a planting-and-harvest timing schedule across the growing season, not a physical layout tool." }, { question: "Does the schedule reorder automatically as I change planting months?", answer: "Yes — the list re-sorts by planting month instantly whenever you add, edit, or remove a plant." }, { question: "Is my garden plan saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the schedule before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
