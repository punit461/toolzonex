import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/compost-calculator",
    navName: "Compost Calculator",
    navDescription: "Brown & green material by target ratio.",
    name: "Compost Calculator",
    description: "Calculate how much brown (carbon-rich) and green (nitrogen-rich) material your compost bin or pile needs at a target brown-to-green ratio by volume.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Compost Calculator - Brown & Green Material Ratio",
    seoDescription: "Free compost calculator. Enter your bin or pile's volume and target brown-to-green ratio to calculate how much of each material to add.",
    keywords: ["compost calculator", "brown green ratio calculator", "compost ratio calculator", "carbon nitrogen ratio compost", "how much compost material"],
    ogTitle: "Compost Calculator - Brown & Green Material Ratio | ToolZoneX",
    ogDescription: "Calculate how much brown and green material your compost pile needs at a target ratio.",
    schemaName: "Compost Calculator",
    schemaDescription: "Calculate how much brown (carbon-rich) and green (nitrogen-rich) material a compost bin or pile needs at a target brown-to-green ratio by volume.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What counts as \"brown\" versus \"green\" material?", answer: "Browns are dry, carbon-rich materials — dried leaves, straw, shredded cardboard, and wood chips. Greens are moist, nitrogen-rich materials — food scraps, fresh grass clippings, and coffee grounds. Browns provide energy for decomposer microbes; greens provide the nitrogen they need to grow and reproduce." }, { question: "What happens if the ratio is off?", answer: "Too much green material tends to make a pile wet, compacted, and smelly (excess nitrogen breaking down anaerobically). Too much brown material slows decomposition way down since there isn't enough nitrogen to fuel the microbes. The 3:1 or 2:1 brown-to-green guideline by volume helps avoid both." }, { question: "Is this ratio by volume or by weight?", answer: "By volume — this is the more common and practical way home composters measure materials, since it's much easier to eyeball a bucket or wheelbarrow load than to weigh compost ingredients." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
