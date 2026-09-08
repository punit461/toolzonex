import DataObjectIcon from '@mui/icons-material/DataObject';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/manifest-json-generator",
    navName: "Manifest.json Generator",
    navDescription: "Generate a PWA web app manifest.",
    name: "Manifest.json Generator",
    description: "Generate a complete manifest.json file for a Progressive Web App, including icons, display mode, and theme colors.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DataObjectIcon fontSize="large" color="primary"/>,
    seoTitle: "Manifest.json Generator - PWA Web App Manifest Builder",
    seoDescription: "Generate a complete manifest.json file for a Progressive Web App, including icons, display mode, and theme colors. Free online PWA manifest generator.",
    keywords: ["manifest.json generator", "web app manifest generator", "pwa manifest builder", "progressive web app manifest", "manifest json creator"],
    ogTitle: "Manifest.json Generator - PWA Web App Manifest Builder | ToolZoneX",
    ogDescription: "Generate a complete manifest.json file for a Progressive Web App, including icons, display mode, and theme colors.",
    schemaName: "Manifest.json Generator",
    schemaDescription: "Generate a complete manifest.json file for a Progressive Web App, including icons, display mode, and theme colors.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between name and short_name?", answer: "name is the full app name shown on install prompts and app listings, while short_name is a shorter label used where space is limited, such as under a home-screen icon." }, { question: "Which display mode should I pick?", answer: "standalone is the most common choice for app-like experiences; fullscreen hides even the status bar for immersive apps like games; minimal-ui keeps a few browser controls; browser opens like a normal browser tab." }, { question: "Do I need more icon sizes than 192x192 and 512x512?", answer: "Those two cover the vast majority of PWA install and splash-screen requirements across platforms, though some platforms may use additional sizes or maskable icon variants for finer visual control." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
