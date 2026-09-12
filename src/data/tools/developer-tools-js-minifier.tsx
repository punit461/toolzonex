import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/js-minifier",
    navName: "JS Minifier",
    navDescription: "Compress JavaScript code instantly.",
    name: "JavaScript Minifier",
    description: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "JavaScript Minifier - Compress JS Code Online",
    seoDescription: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
    keywords: ["js minifier", "javascript minifier", "compress js", "minify javascript online", "js minify online", "javascript minify", "javascript compress", "minify js", "minimize js"],
    ogTitle: "JavaScript Minifier - Compress JS Code Online | ToolZoneX",
    ogDescription: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size.",
    schemaName: "JavaScript Minifier",
    schemaDescription: "Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this safe for production code?", answer: "For complex production codebases, a full AST-based minifier like Terser or esbuild is safer and more thorough — this tool is best for quick, simple minification needs." }, { question: "Can I minify js online without installing anything?", answer: "Yes — paste your JavaScript into the input box and click Minify JS. Everything runs in your browser, so there's nothing to install and no build tooling required." }, { question: "What does this JavaScript minify / compress js tool actually remove?", answer: "It strips comments (both // and /* */ styles), collapses extra whitespace and line breaks, and removes unnecessary spaces around operators and punctuation — reducing file size without changing behavior for typical scripts." }, { question: "Does minimizing JS change how my code runs?", answer: "It shouldn't — minifying only removes comments and formatting whitespace, not logic. However, this is a basic regex-based minifier, not a full parser, so always test minified output before deploying it, especially for complex code." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
