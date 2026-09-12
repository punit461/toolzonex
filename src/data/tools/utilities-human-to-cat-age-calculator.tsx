import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/human-to-cat-age-calculator",
    navName: "Human to Cat Age Calculator",
    navDescription: "Convert a human age to cat years.",
    name: "Human to Cat Age Calculator",
    description: "Convert a human-equivalent age into the cat age that corresponds to the same life stage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Human to Cat Age Calculator - Human Years to Cat Years",
    seoDescription: "Free human to cat age calculator. Convert a human-equivalent age into cat years using the reverse of the standard vet cat-aging scale.",
    keywords: ["human to cat age calculator", "human years to cat years", "convert human age to cat age", "reverse cat age calculator", "cat age equivalent calculator"],
    ogTitle: "Human to Cat Age Calculator - Human Years to Cat Years | ToolZoneX",
    ogDescription: "Convert a human age into its cat-year equivalent.",
    schemaName: "Human to Cat Age Calculator",
    schemaDescription: "Convert a human-equivalent age into cat years using the inverse of the standard non-linear cat-aging scale.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from a regular cat age calculator?", answer: "A standard cat age calculator takes your cat's actual age and converts it to a human-equivalent age. This tool runs in the opposite direction — you enter a human-equivalent age, and it tells you the cat age that corresponds to it, which is useful when you're starting from a human age rather than a cat's age." }, { question: "Why isn't the scale linear?", answer: "Cats mature very quickly in their first two years and then age more steadily afterward, so a flat multiplier would badly misrepresent early life stages. The piecewise scale used here (and by vets) better reflects how quickly a young cat matures compared to an older one." }, { question: "Can this be used for very young human ages?", answer: "Yes — for human ages up to 15, the calculator uses the first band (Human Age ÷ 15), reflecting that a cat reaches sexual maturity and roughly a 15-year-old human's life stage within its first year." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
