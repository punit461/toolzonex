import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/regex-cheat-sheet",
    navName: "Regex Cheat Sheet",
    navDescription: "Quick reference for regex syntax & patterns.",
    name: "Regex Cheat Sheet",
    description: "A categorized quick reference for regular expression syntax with a live pattern tester. Free online regex cheat sheet.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "Regex Cheat Sheet - Common Patterns & Syntax Reference",
    seoDescription: "Free regex cheat sheet with a live pattern tester. Categorized reference for character classes, quantifiers, anchors, groups, flags, and common patterns.",
    keywords: ["regex cheat sheet", "regex patterns reference", "regular expression syntax", "regex tester online", "common regex patterns"],
    ogTitle: "Regex Cheat Sheet - Common Patterns & Syntax Reference | ToolZoneX",
    ogDescription: "A categorized quick reference for regex syntax with a live pattern tester.",
    schemaName: "Regex Cheat Sheet",
    schemaDescription: "A categorized quick reference for regular expression syntax with a live pattern tester.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are these patterns guaranteed to cover every edge case?", answer: "No — patterns like the email and URL examples cover the vast majority of real-world cases but aren't exhaustive against every technically valid edge case in their respective specifications. For strict validation (like real email deliverability), pair regex checks with an actual verification step." }, { question: "Does this tool support every regex flavor?", answer: "The reference and tester use JavaScript's regex engine (ECMAScript syntax). Most patterns here also work in PCRE-based languages like Python or PHP, but some advanced features may differ slightly." }, { question: "Is my test data uploaded anywhere?", answer: "No — the quick tester runs entirely client-side in your browser. Nothing you type is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
