import WindowIcon from '@mui/icons-material/Window';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/browserconfig-generator",
    navName: "Browserconfig.xml Generator",
    navDescription: "Generate a browserconfig.xml for Windows tiles.",
    name: "Browserconfig.xml Generator",
    description: "Generate the browserconfig.xml file Windows and Edge use for pinned-site tile images and colors.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <WindowIcon fontSize="large" color="primary"/>,
    seoTitle: "Browserconfig.xml Generator - Windows Tile Config Builder",
    seoDescription: "Generate the browserconfig.xml file Windows and Edge use for pinned-site tile images and colors. Free online browserconfig generator.",
    keywords: ["browserconfig.xml generator", "windows tile generator", "mstile generator", "pinned site tile config", "browserconfig generator online"],
    ogTitle: "Browserconfig.xml Generator - Windows Tile Config Builder | ToolZoneX",
    ogDescription: "Generate the browserconfig.xml file Windows and Edge use for pinned-site tile images and colors.",
    schemaName: "Browserconfig.xml Generator",
    schemaDescription: "Generate the browserconfig.xml file Windows and Edge use for pinned-site tile images and colors.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is browserconfig.xml still relevant?", answer: "It's a somewhat legacy, Windows-specific feature with a shrinking practical impact as pinned-tile Start screens have become less common, but it's still checked by some SEO and site-auditing tools and included by default in many favicon-generator templates." }, { question: "Where does the file need to live?", answer: "At the root of your domain, e.g. https://example.com/browserconfig.xml, so Windows can find it automatically." }, { question: "Do I need all four tile sizes?", answer: "Providing all four covers every tile size Windows might display; if you skip one, that size simply falls back to a default tile rather than causing an error." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
