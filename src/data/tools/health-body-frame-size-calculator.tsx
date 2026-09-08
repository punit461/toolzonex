import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/body-frame-size-calculator",
    navName: "Body Frame Size Calculator",
    navDescription: "Small, medium or large frame from wrist & height.",
    name: "Body Frame Size Calculator",
    description: "Classify your body frame size as small, medium, or large using the standard height-to-wrist-circumference ratio method.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <AccessibilityNewIcon fontSize="large" color="primary"/>,
    seoTitle: "Body Frame Size Calculator - Small, Medium or Large",
    seoDescription: "Free body frame size calculator using the height-to-wrist ratio method. Enter your height and wrist circumference to find your frame size.",
    keywords: ["body frame size calculator", "wrist to height ratio calculator", "small medium large frame calculator", "body frame calculator", "skeletal frame size"],
    ogTitle: "Body Frame Size Calculator | ToolZoneX",
    ogDescription: "Classify your body frame size using the height-to-wrist ratio method.",
    schemaName: "Body Frame Size Calculator",
    schemaDescription: "Classify body frame size as small, medium, or large using the height-to-wrist-circumference ratio method.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How do I measure my wrist circumference?", answer: "Wrap a soft measuring tape around your wrist just below the wrist bone (where a watch would sit) and note the circumference in centimeters or inches, keeping the tape snug but not tight." }, { question: "Is there a wrist-only method that doesn't need height?", answer: "Yes — some charts classify frame size from wrist circumference alone using fixed height-based ranges (for example, for women over 5'5\", under 6 inches is small, 6-6.25 inches is medium, and over 6.25 inches is large). This calculator uses the more precise height-to-wrist ratio method instead, which adjusts continuously for your exact height rather than a fixed height bracket." }, { question: "Is this a medical measurement?", answer: "No — body frame size is a general fitness reference, not a diagnostic or medical measurement. It's best used as one input alongside other health metrics, not as a standalone health assessment." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
