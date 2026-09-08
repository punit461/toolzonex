import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/find-and-replace-text",
    navName: "Find and Replace Text",
    navDescription: "Simple literal find-and-replace, no regex needed.",
    name: "Find and Replace Text",
    description: "Perform a simple, literal find-and-replace on text, with case-sensitive and replace-all vs replace-first-occurrence options — no regex syntax needed.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Find and Replace Text - Simple Text Substitution Tool",
    seoDescription: "Free online find and replace text tool. Perform simple literal text substitution with case-sensitive and replace-all options, no regex required.",
    keywords: ["find and replace text", "text substitution tool", "find and replace online", "simple text replace tool", "replace word in text"],
    ogTitle: "Find and Replace Text - Simple Text Substitution Tool | ToolZoneX",
    ogDescription: "Perform simple literal text substitution with case-sensitive and replace-all options.",
    schemaName: "Find and Replace Text",
    schemaDescription: "Perform a simple, literal find-and-replace on text, with case-sensitive and replace-all vs replace-first-occurrence options — no regex syntax needed.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Regex Replace Tester?", answer: "The Regex Replace Tester requires writing a REGEX pattern for advanced, pattern-based matching — useful for things like matching any digit or any email address. This Find and Replace Text tool does simple literal text find-and-replace with no regex syntax needed at all, for users who just want a quick, straightforward substitution." }, { question: "What does \"case-sensitive\" control?", answer: "When enabled, the search only matches text with exactly the same uppercase/lowercase letters you typed in the Find field. When disabled, \"Dog\", \"dog\", and \"DOG\" are all treated as matches." }, { question: "What happens with \"Replace First Occurrence Only\"?", answer: "Only the very first match found in the text (reading left to right) gets replaced — every later occurrence of the same text is left exactly as it was." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
