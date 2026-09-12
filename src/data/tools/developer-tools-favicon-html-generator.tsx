import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/favicon-html-generator",
    navName: "Favicon HTML Generator",
    navDescription: "Generate favicon link and meta tags for your site.",
    name: "Favicon HTML Generator",
    description: "Generate the exact favicon link and meta tags to paste into your page head, based on the icon assets you have available.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "Favicon HTML Generator - Favicon Tags for Your Head",
    seoDescription: "Generate the exact favicon link and meta tags to paste into your page head, based on the icon assets you have available. Free online tool.",
    keywords: ["favicon html generator", "favicon link tags", "favicon meta tags generator", "favicon code generator", "favicon head tags"],
    ogTitle: "Favicon HTML Generator - Favicon Tags for Your Head | ToolZoneX",
    ogDescription: "Generate the exact favicon link and meta tags to paste into your page head.",
    schemaName: "Favicon HTML Generator",
    schemaDescription: "Generate the exact favicon link and meta tags to paste into your page head, based on the icon assets you have available.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Do I need every icon size?", answer: "No — modern browsers only need a handful (favicon.ico plus a couple of PNG sizes) to work well everywhere, but including Apple touch and Android icons improves how your site looks when added to a phone's home screen." }, { question: "What is the theme-color meta tag for?", answer: "It tells supporting mobile browsers (mainly Android Chrome) what color to use for UI elements like the browser toolbar when a user visits your site." }, { question: "Do I still need to create the actual image files?", answer: "Yes — this tool only generates the HTML tags that reference your files; you still need to create the actual .ico and .png files at the sizes and paths referenced." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
