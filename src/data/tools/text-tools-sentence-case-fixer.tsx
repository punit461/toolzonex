import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/sentence-case-fixer",
    navName: "Sentence Case Fixer",
    navDescription: "Fix capitalization errors.",
    name: "Sentence Case Fixer & Text Case Converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Sentence Case Fixer - Convert Text Case Online",
    seoDescription: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool to fix caps lock errors.",
    keywords: ["sentence case", "convert text case", "uppercase to lowercase", "title case converter", "fix caps lock", "capitalize text", "caps fix"],
    ogTitle: "Sentence Case Fixer - Convert Text Case Online | ToolZoneX",
    ogDescription: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool.",
    schemaName: "Sentence Case Fixer",
    schemaDescription: "Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I do a quick caps fix on my text?", answer: "Paste the text, pick \"Sentence case\", \"lower case\", or \"UPPER CASE\" from the Case Mode dropdown, and click \"Convert Text\" — a one-click caps fix for text typed with Caps Lock stuck on or pasted from an all-caps source." }, { question: "Will this fix grammar or spelling too?", answer: "No — this tool only changes letter casing; it does not correct spelling, grammar, or punctuation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
