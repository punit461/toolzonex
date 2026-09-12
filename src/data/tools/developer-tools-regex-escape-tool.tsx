import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/regex-escape-tool",
    navName: "Regex Escape Tool",
    navDescription: "Escape text for safe use inside a regex.",
    name: "Regex Escape Tool",
    description: "Escape every regex special character in plain text so it can be safely embedded inside a regular expression as a literal match.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Regex Escape Tool - Escape Text for Regular Expressions",
    seoDescription: "Free online regex escape tool. Escape all special regex characters in plain text so it can be safely used as a literal pattern.",
    keywords: ["regex escape tool", "escape regex characters", "regex special character escape", "escape string for regex online", "regexp escape"],
    ogTitle: "Regex Escape Tool - Escape Text for Regular Expressions | ToolZoneX",
    ogDescription: "Escape every regex special character in plain text so it can be safely embedded inside a regular expression.",
    schemaName: "Regex Escape Tool",
    schemaDescription: "Escape every regex special character in plain text so it can be safely embedded inside a regular expression as a literal match.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Regex Tester or Regex Replace Tester?", answer: "Our Regex Tester and Regex Replace Tester TEST or apply a regex pattern you already have against sample text. This Regex Escape Tool does something upstream of that — it prepares arbitrary literal text so it can be SAFELY embedded inside a regex pattern without its characters being misinterpreted as regex syntax." }, { question: "Why would I need to escape plain text before using it in a regex?", answer: "Characters like a period, asterisk, and parenthesis have special meaning in regular expressions. If you insert unescaped user input or a dynamic string containing those characters directly into a pattern, it can match unintended text or throw a syntax error — escaping first guarantees it's treated as literal text." }, { question: "Do I need to escape forward slashes too?", answer: "Only if you're building a JavaScript regex literal written between two slashes, like /pattern/ — in that context an unescaped slash would end the pattern early. If you're passing a string to new RegExp(pattern) instead, forward slashes don't need escaping." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
