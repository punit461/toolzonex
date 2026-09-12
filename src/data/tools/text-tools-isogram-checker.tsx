import FindInPageIcon from '@mui/icons-material/FindInPage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/isogram-checker",
    navName: "Isogram Checker",
    navDescription: "Check if a word or phrase repeats no letters.",
    name: "Isogram Checker",
    description: "Check whether text is an isogram, with no letter repeated, and see exactly which letters repeat if it isn't.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindInPageIcon fontSize="large" color="primary"/>,
    seoTitle: "Isogram Checker - Check for Repeated Letters Online",
    seoDescription: "Check whether text is an isogram, with no letter repeated, and see exactly which letters repeat if it isn't. Free online isogram checker.",
    keywords: ["isogram checker", "is this an isogram", "check for repeated letters", "isogram tool", "no repeated letters checker"],
    ogTitle: "Isogram Checker - Check for Repeated Letters Online | ToolZoneX",
    ogDescription: "Check whether text is an isogram, with no letter repeated, and see which letters repeat if it isn't.",
    schemaName: "Isogram Checker",
    schemaDescription: "Check whether text is an isogram, with no letter repeated, and see exactly which letters repeat if it isn't.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Pangram Checker?", answer: "A pangram must contain EVERY letter of the alphabet at least once. An isogram must contain NO letter more than once. These are nearly opposite concepts that are easy to confuse by name, even though both deal with letter coverage." }, { question: "Does spacing between words count against being an isogram?", answer: "No — spaces and punctuation are ignored entirely, so a multi-word phrase is checked purely on its letters, treating it the same as if the words were joined together." }, { question: "Is capitalization considered when checking for repeats?", answer: "No — the check is case-insensitive, so \"A\" and \"a\" count as the same letter and would count as a repeat if both appeared." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
