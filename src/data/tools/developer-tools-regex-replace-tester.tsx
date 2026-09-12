import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/regex-replace-tester",
    navName: "Regex Replace Tester",
    navDescription: "Preview find-and-replace output for a regex.",
    name: "Regex Replace Tester",
    description: "Test a regex find-and-replace pattern live and preview the resulting output text, with support for $1, $2 capture group syntax.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Regex Replace Tester - Preview Find & Replace Output",
    seoDescription: "Free regex replace tester. Enter a pattern, flags, and replacement string to preview the resulting find-and-replace output text live.",
    keywords: ["regex replace tester", "regex find and replace tester", "regex substitution tester", "javascript regex replace tool", "regex replace preview"],
    ogTitle: "Regex Replace Tester - Preview Find & Replace Output | ToolZoneX",
    ogDescription: "Test a regex find-and-replace pattern and preview the output text live.",
    schemaName: "Regex Replace Tester",
    schemaDescription: "Test a regex find-and-replace pattern live and preview the resulting output text.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Regex Tester?", answer: "The Regex Tester only tests and highlights matches within your sample text — it shows you what a pattern finds, but doesn't change anything. This Regex Replace Tester goes one step further and specifically previews the find-and-replace OUTPUT text, running your pattern through JavaScript's String.replace() with your replacement string so you can see the transformed result before using it in real code." }, { question: "What happens if my pattern is invalid?", answer: "The tool catches the error from JavaScript's regex engine and displays a friendly error message instead of crashing, so you can fix your pattern and keep experimenting without losing your sample text or replacement string." }, { question: "How do I reuse captured groups in the replacement?", answer: "Wrap the parts of your pattern you want to reuse in parentheses, then reference them in the replacement string as $1, $2, and so on, in the order the groups appear in the pattern — this is standard JavaScript String.replace() syntax." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
