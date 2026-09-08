import TvIcon from '@mui/icons-material/Tv';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/screen-size-calculator",
    navName: "Screen Size Calculator",
    navDescription: "Screen width, height & area from diagonal.",
    name: "Screen Size Calculator - Calculate Width, Height & Area",
    description: "Calculate screen width, height, and area from diagonal size and aspect ratio. Free online screen size calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TvIcon fontSize="large" color="primary"/>,
    seoTitle: "Screen Size Calculator - Calculate Width, Height & Area",
    seoDescription: "Free online screen size calculator. Enter diagonal size and aspect ratio to get width, height in inches and cm, and total screen area.",
    keywords: ["screen size calculator", "monitor size calculator", "tv size calculator", "screen dimensions calculator", "aspect ratio calculator", "display size calculator"],
    ogTitle: "Screen Size Calculator - Calculate Width, Height & Area | ToolZoneX",
    ogDescription: "Calculate screen width, height, and area from diagonal size and aspect ratio.",
    schemaName: "Screen Size Calculator",
    schemaDescription: "Calculate screen width, height, and area from diagonal size and aspect ratio.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is screen size measured diagonally?", answer: "Diagonal measurement is an industry standard that allows a single number to represent screen size regardless of aspect ratio." }, { question: "Does bezel size affect the calculation?", answer: "No — this calculator uses the viewable display area only. The bezel adds to the overall physical dimensions but is not part of the diagonal measurement." }, { question: "What is the most common aspect ratio?", answer: "16:9 is the most common for modern monitors and TVs. 16:10 is popular for productivity monitors, and 21:9 for ultrawide displays." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
