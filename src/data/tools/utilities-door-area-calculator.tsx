import DoorFrontIcon from '@mui/icons-material/DoorFront';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/door-area-calculator",
    navName: "Door Area Calculator",
    navDescription: "Door area with common size presets.",
    name: "Door Area Calculator",
    description: "Calculate total door area from width, height, and door count, with quick presets for standard interior, standard exterior, and double door sizes.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DoorFrontIcon fontSize="large" color="primary"/>,
    seoTitle: "Door Area Calculator - Total Door Area & Presets",
    seoDescription: "Free door area calculator. Enter door width, height, and count — or pick a standard preset — to calculate total door area for paint or material estimation.",
    keywords: ["door area calculator", "door size calculator", "standard door size calculator", "how much paint for a door", "door square footage calculator"],
    ogTitle: "Door Area Calculator - Total Door Area & Presets | ToolZoneX",
    ogDescription: "Calculate total door area from width, height, and count, with standard size presets.",
    schemaName: "Door Area Calculator",
    schemaDescription: "Calculate total door area as width times height divided by 144, multiplied by the number of doors, with common preset door sizes.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Window Area Calculator?", answer: "The Window Area Calculator applies the same simple width-by-height math to windows instead of doors. This tool is specifically built for doors, and adds common door-size presets (standard interior, standard exterior, double door) as a convenience so you don't need to measure a door you already know the standard type of." }, { question: "Do the presets match every door exactly?", answer: "Presets reflect common standard sizes, but actual doors can vary by manufacturer, region, or custom order. Always measure your actual door when precision matters, and use the presets mainly as a fast starting point or estimate." }, { question: "Should I measure the door slab only, or include the frame?", answer: "For paint or material coverage, measure the door slab itself (the moving panel), not the surrounding frame or trim, since that's the surface actually being covered." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
