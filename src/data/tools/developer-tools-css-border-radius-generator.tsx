import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-border-radius-generator",
    navName: "CSS Border Radius Generator",
    navDescription: "Visually generate border-radius CSS.",
    name: "CSS Border Radius Generator",
    description: "Visually design corner radii with a live preview and generate the border-radius CSS, shorthand or per-corner.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Border Radius Generator - Live Preview & Copy CSS",
    seoDescription: "Free CSS border-radius generator. Adjust each corner independently or uniformly with a live preview, then copy the generated CSS.",
    keywords: ["css border radius generator", "border radius generator", "rounded corners css generator", "css corner radius tool"],
    ogTitle: "CSS Border Radius Generator - Live Preview & Copy CSS | ToolZoneX",
    ogDescription: "Visually design corner radii with a live preview and generate the border-radius CSS.",
    schemaName: "CSS Border Radius Generator",
    schemaDescription: "Visually design corner radii with a live preview and generate the border-radius CSS, shorthand or per-corner.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: [{ question: "What order are the four values in?", answer: "CSS's border-radius shorthand always follows the order top-left, top-right, bottom-right, bottom-left — the same clockwise-from-top-left convention used by other CSS shorthand properties like margin and padding." }, { question: "Can I use percentages instead of pixels?", answer: "This generator outputs pixel values, which work well for most fixed-size UI elements. For a shape that should scale with the element (like a perfect circle or pill button regardless of size), you can manually replace the pixel value with 50% in your CSS." }, { question: "Does browser support vary for border-radius?", answer: "No — border-radius has been supported unprefixed in all modern browsers for many years, so the CSS generated here works everywhere without vendor prefixes." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
