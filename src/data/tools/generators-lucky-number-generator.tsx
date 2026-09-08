import StarIcon from '@mui/icons-material/Star';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/lucky-number-generator",
    navName: "Lucky Number Generator",
    navDescription: "Random lucky numbers in your range.",
    name: "Lucky Number Generator - Custom Range",
    description: "Generate one or more random lucky numbers within a custom range, with options for how many to generate and whether duplicates are allowed.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <StarIcon fontSize="large" color="primary"/>,
    seoTitle: "Lucky Number Generator - Custom Range & Count",
    seoDescription: "Generate one or more random lucky numbers within a custom range. Free online tool with options for count and whether duplicates are allowed.",
    keywords: ["lucky number generator", "random lucky numbers", "lucky number picker", "generate lucky numbers"],
    ogTitle: "Lucky Number Generator - Custom Range & Count | ToolZoneX",
    ogDescription: "Generate one or more random lucky numbers within a custom range.",
    schemaName: "Lucky Number Generator",
    schemaDescription: "Generate one or more random lucky numbers within a custom range, with options for how many to generate and whether duplicates are allowed.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What happens if I ask for more unique numbers than fit in my range?", answer: "The tool shows an error asking you to either allow duplicates or widen your range, since it's not possible to generate that many unique numbers from a smaller pool." }, { question: "Can duplicate numbers appear?", answer: "Only if you turn on \"Allow duplicates.\" With it off, every generated number in a batch is unique." }, { question: "Is this connected to any real lottery?", answer: "No — this is an independent random number tool for personal use, games, or fun. For official lottery formats, see this site's dedicated Lottery Number Generator and Powerball Number Generator tools." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
