import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/regex-tester",
    navName: "Regex Tester",
    navDescription: "Test and debug regex patterns.",
    name: "Regex Tester & Evaluator",
    description: "Test, evaluate, and debug regular expressions online. Real-time regex matching and highlighting tool for developers.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Regex Tester - Online Regular Expression Evaluator",
    seoDescription: "Free regular expression tester online. Check, debug, and analyze regex patterns with real-time match highlighting — a regex tester tool for JavaScript-flavored expressions, close to Java, PCRE, and most other regex engines.",
    keywords: ["regex tester", "regex evaluator", "regular expression online", "regex match", "regex debugger", "regular expression tester online", "regular expression checker", "regex analyzer", "check java regex online", "regular expression finder", "regex online", "regex tester tool", "regular expression tester"],
    ogTitle: "Regex Tester - Online Regular Expression Evaluator | ToolZoneX",
    ogDescription: "Test, evaluate, and debug regular expressions online.",
    schemaName: "Regex Tester",
    schemaDescription: "Test, evaluate, and debug regular expressions online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Which regex flavor does this use?", answer: "It uses standard JavaScript (ECMAScript) regular expression syntax, the same engine used natively in browsers and Node.js." }, { question: "Can I check Java regex online with this tool?", answer: "This tool evaluates patterns using JavaScript's regex engine, not Java's java.util.regex. The two flavors are very close — most character classes, quantifiers, and groups behave the same — but they aren't 100% identical: named capture groups, lookbehind support, and some Unicode property escapes differ by engine and JavaScript runtime version. For patterns that must run exactly as they will in a Java application, verify edge cases (especially lookbehind and named groups) in a JVM before relying on results here." }, { question: "Is this a regular expression checker or just a tester?", answer: "Both — it checks whether your pattern is valid (showing a syntax error if not) and tests it live against your sample text, highlighting every match as you type." }, { question: "How do I find all matches, not just the first one?", answer: "Keep the \"g\" (Global) flag checked, which is on by default — the tool then acts as a regular expression finder that highlights every match in the test string, not only the first." }, { question: "Does this work as an online regex analyzer for debugging patterns?", answer: "Yes — paste your pattern and sample text, toggle the g/i/m flags, and matches highlight live so you can see exactly what a regex does and does not capture before using it in code." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
