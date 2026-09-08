import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/name-formatter",
    navName: "Name Formatter",
    navDescription: "Fix inconsistent name capitalization.",
    name: "Name Formatter",
    description: "Properly capitalize a name or list of names, with handling for Mc/Mac prefixes, O' names, lowercase particles like von/van/de, and suffixes like Jr./Sr./II/III.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Name Formatter - Fix Name Capitalization Online",
    seoDescription: "Properly capitalize a name or list of names, with handling for Mc/Mac prefixes, O' names, particles, and suffixes. Free online name formatter.",
    keywords: ["name formatter", "fix name capitalization", "capitalize names online", "name case converter", "proper case names"],
    ogTitle: "Name Formatter - Fix Name Capitalization Online | ToolZoneX",
    ogDescription: "Properly capitalize a name or list of names, with handling for Mc/Mac prefixes, O' names, particles, and suffixes.",
    schemaName: "Name Formatter",
    schemaDescription: "Properly capitalize a name or list of names, with handling for Mc/Mac prefixes, O' names, lowercase particles like von/van/de, and suffixes like Jr./Sr./II/III.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Name Splitter?", answer: "The Name Splitter takes a full name and breaks it apart into separate first, middle, and last name fields. This Name Formatter does the opposite kind of work — it never splits the name into parts, it only fixes the capitalization of the name as a whole, leaving it as one string." }, { question: "Will every unusual name be handled perfectly?", answer: "No naming convention rule set can cover every name in the world — this tool uses hand-written patterns for the most common prefixes, particles, and suffixes, but unusual or less common name structures may still need manual review." }, { question: "Are particles like \"von\" or \"de\" always lowercased?", answer: "Only when they appear in the middle of a name, following common convention (as in \"Ludwig van Beethoven\"). If one of these words is the very first word of the name, it's capitalized instead, since names don't typically start with a lowercase particle." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
