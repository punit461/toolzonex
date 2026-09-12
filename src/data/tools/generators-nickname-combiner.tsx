import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/nickname-combiner",
    navName: "Nickname Combiner",
    navDescription: "Blend two names into fun portmanteau nickname options.",
    name: "Nickname Combiner - Blend Two Names into Nicknames",
    description: "Combine two names into several portmanteau-style nickname options using a few different blending strategies, like splitting and swapping name halves.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Nickname Combiner - Blend Two Names into Nicknames",
    seoDescription: "Free online nickname combiner. Blend two names into several portmanteau-style nickname options using different blending strategies.",
    keywords: ["nickname combiner", "name blender online", "combine two names generator", "portmanteau name generator", "ship name maker"],
    ogTitle: "Nickname Combiner - Blend Two Names into Nicknames | ToolZoneX",
    ogDescription: "Blend two names into several portmanteau-style nickname options.",
    schemaName: "Nickname Combiner",
    schemaDescription: "Combine two names into several portmanteau-style nickname options using a few different blending strategies, like splitting and swapping name halves.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "Are the nicknames randomly generated?", answer: "No — every option comes from a fixed, rule-based blending strategy (like swapping name halves or alternating letters), so the same two names always produce the same set of results." }, { question: "Does the order I enter the names matter?", answer: "Yes, slightly — since several blends combine the beginning of one name with the ending of the other, swapping the input order changes which specific combinations appear, though the overall style of results stays similar." }, { question: "Why do some blending strategies not appear in the results?", answer: "Duplicate or identical-to-the-original results are automatically filtered out, so very short names may produce fewer than six unique combinations." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
