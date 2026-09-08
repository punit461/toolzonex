import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/text-merger",
    navName: "Text Merger",
    navDescription: "Merge two lists of text line by line.",
    name: "Text Merger - Combine Lists Line by Line",
    description: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Merger - Combine Lists Line by Line",
    seoDescription: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
    keywords: ["text merger", "combine lists", "merge lines", "list concatenator", "combine two columns", "list combiner", "text combiner", "string append online"],
    ogTitle: "Text Merger - Combine Lists Line by Line | ToolZoneX",
    ogDescription: "Combine two lists of text line by line instantly. Perfect for merging columns of data.",
    schemaName: "Text Merger",
    schemaDescription: "Combine two lists of text line by line instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this the same as a list combiner?", answer: "Yes — this tool works as a list combiner, pairing each line of List 1 with the matching line of List 2 so you can merge two columns without spreadsheet formulas." }, { question: "Can I use this as a text combiner or string append tool online?", answer: "Yes — enter your first block of text as List 1 and the text you want appended as List 2, choose a separator (or none), and the tool acts as a text combiner or string append tool, joining each pair of lines into one string." }, { question: "What if my two lists have a different number of lines?", answer: "Extra lines in the longer list are left unmatched or blank-paired, depending on your settings — for best results, keep both lists the same length." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
