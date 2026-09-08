import CakeIcon from '@mui/icons-material/Cake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cake-serving-calculator",
    navName: "Cake Serving Calculator",
    navDescription: "How many people a cake pan size serves.",
    name: "Cake Serving Calculator",
    description: "Calculate how many people a finished cake serves based on pan shape/size and slice-size preference (wedding or party style).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Cake Serving Calculator - Servings by Pan Size",
    seoDescription: "Free cake serving calculator. Select cake pan shape/size and slice style to calculate how many people a cake serves.",
    keywords: ["cake serving calculator", "cake serving size chart", "how many does a cake serve", "wedding cake serving calculator", "cake portions calculator"],
    ogTitle: "Cake Serving Calculator - Servings by Pan Size | ToolZoneX",
    ogDescription: "Calculate how many people a finished cake serves based on pan size and slice style.",
    schemaName: "Cake Serving Calculator",
    schemaDescription: "Look up standard cake-serving-chart servings for a given pan shape/size and slice-size preference (wedding or party style).",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Baking Pan Converter?", answer: "The Baking Pan Converter is about substituting one pan size for another based on batter volume — useful when adapting a recipe to a different pan you own. This tool instead estimates how many people a finished cake of a given pan size actually serves, which is a separate question about portioning, not batter volume." }, { question: "Why do wedding slices serve so many more people than party slices?", answer: "Wedding-style slices are intentionally small (about 1\" × 2\") because they're typically served alongside other desserts or as part of a multi-tier cake-cutting ceremony, while party-style slices (about 2\" × 2\") are sized as a standalone dessert portion." }, { question: "Are these serving counts exact?", answer: "They're commonly cited industry figures used by bakeries for standard cake heights (typically a single 4\"-tall layer or two stacked layers). Taller, multi-layer cakes can be cut into thinner horizontal slices to serve more people from the same footprint." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
