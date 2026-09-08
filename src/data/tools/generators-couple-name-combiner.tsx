import JoinFullIcon from '@mui/icons-material/JoinFull';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/couple-name-combiner",
    navName: "Couple Name Combiner",
    navDescription: "Blend two names into ship names.",
    name: "Couple Name Combiner - Ship Name Generator",
    description: "Combine two names into several fun ship name suggestions using consistent, rule-based blending patterns.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <JoinFullIcon fontSize="large" color="primary"/>,
    seoTitle: "Couple Name Combiner - Ship Name Generator Online",
    seoDescription: "Free online couple name combiner. Combine two names into fun ship name suggestions using consistent, rule-based blending patterns.",
    keywords: ["couple name combiner", "ship name generator", "name blender", "combine two names", "couple nickname generator", "relationship name generator"],
    ogTitle: "Couple Name Combiner - Ship Name Generator Online | ToolZoneX",
    ogDescription: "Combine two names into several fun ship name suggestions using consistent, rule-based blending patterns.",
    schemaName: "Couple Name Combiner",
    schemaDescription: "Generate rule-based combined ship name suggestions from two names.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Are the combined names random?", answer: "No — the combinations are generated using fixed, deterministic rules (like splitting each name in half and swapping the halves), so the same two names always produce the same set of suggestions." }, { question: "Does the order I enter the names matter?", answer: "Yes, slightly — since some combinations use the first name's beginning with the second name's ending (and vice versa), swapping the input order changes which specific blend appears first, though the overall set of suggestions stays similar." }, { question: "Can I use this for names other than couples?", answer: "Yes — it works for combining any two names, whether that's a couple, a pair of friends, two pets, or two brands you want to mash together for fun." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
