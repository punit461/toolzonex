import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/javascript-beautifier",
    navName: "JavaScript Beautifier",
    navDescription: "Beautify or minify JavaScript code.",
    name: "JavaScript Beautifier",
    description: "Beautify messy JavaScript into readable, properly indented code, or minify it to reduce file size.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JavaScript Beautifier - Beautify or Minify JS Code Online",
    seoDescription: "Free JavaScript beautifier and minifier. Re-indent messy JS code based on brace depth, or minify it by stripping comments and whitespace to reduce file size.",
    keywords: ["javascript beautifier", "js beautifier", "javascript formatter", "js formatter", "beautify javascript", "minify javascript", "javascript prettifier", "format js online"],
    ogTitle: "JavaScript Beautifier - Beautify or Minify JS Online | ToolZoneX",
    ogDescription: "Beautify messy JavaScript into readable, properly indented code, or minify it to reduce file size.",
    schemaName: "JavaScript Beautifier",
    schemaDescription: "Beautify JavaScript by re-indenting coding blocks, or minify it by stripping comments and whitespace.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this the same as a JS formatter or prettifier?", answer: "Yes — beautify, format, and prettify all refer to the same thing: re-indenting JavaScript code for readability." }, { question: "Will beautifying change how my code runs?", answer: "No. Beautifying only adds whitespace and newlines for readability. Minifying removes comments and extra whitespace but preserves the code logic. Neither alters the actual execution behavior." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
