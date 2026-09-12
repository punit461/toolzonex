import GradientIcon from '@mui/icons-material/Gradient';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-gradient-text-generator",
    navName: "CSS Gradient Text Generator",
    navDescription: "Create gradient-filled text with CSS.",
    name: "CSS Gradient Text Generator",
    description: "Pick two colors and an angle to create gradient-filled text using CSS background-clip. Free online CSS gradient text generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <GradientIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS Gradient Text Generator - Free Online Gradient Text Maker",
    seoDescription: "Free online CSS gradient text generator. Pick two colors and an angle to build a gradient text effect with a live preview and one-click copy.",
    keywords: ["css gradient text generator", "gradient text css", "css text gradient maker", "background-clip text generator", "gradient heading css"],
    ogTitle: "CSS Gradient Text Generator - Free Online Gradient Text Maker | ToolZoneX",
    ogDescription: "Create gradient-filled text with CSS and preview it live.",
    schemaName: "CSS Gradient Text Generator",
    schemaDescription: "Pick two colors and an angle to create a gradient text effect with a live preview.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this work in all browsers?", answer: "background-clip: text is well supported in modern browsers, though it still commonly needs the -webkit- prefix (included in the generated CSS) for full compatibility, especially in Safari." }, { question: "Why is my text invisible instead of gradient-filled?", answer: "Make sure color: transparent (or the -webkit-text-fill-color: transparent equivalent) is applied alongside the background-clip properties — without it, the solid text color paints over the gradient." }, { question: "Can I use more than two colors?", answer: "Yes — this generator uses two stops for simplicity, but you can manually extend the copied linear-gradient(...) value with additional comma-separated color stops." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
