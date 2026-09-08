import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/bingo-card-generator",
    navName: "Bingo Card Generator",
    navDescription: "Generate a random 5×5 bingo card.",
    name: "Bingo Card Generator - Free 5×5 Cards",
    description: "Generate a random standard 5×5 bingo card with a B-I-N-G-O layout and a free center space, ready to play or print.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Bingo Card Generator - Free 5×5 Cards",
    seoDescription: "Generate a random standard 5×5 bingo card with a B-I-N-G-O layout and free center space. Free online tool, ready to play or print.",
    keywords: ["bingo card generator", "free bingo card maker", "random bingo card", "printable bingo card generator"],
    ogTitle: "Bingo Card Generator - Free 5×5 Cards | ToolZoneX",
    ogDescription: "Generate a random standard 5×5 bingo card with a B-I-N-G-O layout and a free center space.",
    schemaName: "Bingo Card Generator",
    schemaDescription: "Generate a random standard 5×5 bingo card with a B-I-N-G-O layout and a free center space, ready to play or print.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Are the numbers on each card unique?", answer: "Yes — within each column, all five numbers are unique, matching the standard rule that no number repeats within a single bingo card." }, { question: "Why is the center square marked \"FREE\"?", answer: "The center space of a standard 5×5 bingo card is traditionally a free space that counts as automatically marked for every player." }, { question: "Can I generate multiple different cards?", answer: "Yes — click \"Regenerate Card\" as many times as you like; each click produces a brand-new, independently randomized card." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
