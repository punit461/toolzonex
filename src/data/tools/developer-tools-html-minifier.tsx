import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/html-minifier",
    navName: "HTML Minifier",
    navDescription: "Compress HTML payload size.",
    name: "HTML Minifier",
    description: "Compress and minify HTML code online instantly. Free tool to reduce HTML file size and improve website performance.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "HTML Minifier - Compress HTML Code Online",
    seoDescription: "Compress and minify HTML code online instantly. Free tool to reduce HTML file size and improve website performance.",
    keywords: ["html minifier", "compress html", "html compressor", "minify html online"],
    ogTitle: "HTML Minifier - Compress HTML Code Online | ToolZoneX",
    ogDescription: "Compress and minify HTML code online instantly. Free tool to reduce HTML file size.",
    schemaName: "HTML Minifier",
    schemaDescription: "Compress and minify HTML code online instantly. Free tool to reduce HTML file size and improve website performance.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
