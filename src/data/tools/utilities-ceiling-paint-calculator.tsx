import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ceiling-paint-calculator",
    navName: "Ceiling Paint Calculator",
    navDescription: "Paint needed for a ceiling, by room size.",
    name: "Ceiling Paint Calculator",
    description: "Calculate how much paint you need for a ceiling from room length and width, number of coats, and coverage rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FormatPaintIcon fontSize="large" color="primary"/>,
    seoTitle: "Ceiling Paint Calculator - How Much Paint You Need",
    seoDescription: "Free ceiling paint calculator. Enter room length and width, coats, and coverage rate to find how much ceiling paint to buy.",
    keywords: ["ceiling paint calculator", "how much paint for a ceiling", "ceiling paint estimator", "paint calculator ceiling", "ceiling painting calculator"],
    ogTitle: "Ceiling Paint Calculator - How Much Paint You Need | ToolZoneX",
    ogDescription: "Calculate how much paint you need for a ceiling from room dimensions and coats.",
    schemaName: "Ceiling Paint Calculator",
    schemaDescription: "Calculate ceiling paint needed from room length, width, number of coats, and paint coverage rate.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does a ceiling usually need a flat or matte finish?", answer: "Flat and matte finishes scatter light rather than reflecting it, which hides small imperfections, uneven texture, and roller marks that a glossier finish would highlight under direct or angled light." }, { question: "Do I need to subtract light fixtures or vents?", answer: "This calculator doesn't subtract fixture area, since it's usually small relative to the whole ceiling and most painters round up anyway. For a ceiling with unusually large skylights or built-in features, you can reduce the entered length or width slightly to compensate." }, { question: "How is this different from the Paint Calculator?", answer: "The Paint Calculator is built for walls, letting you add multiple wall rows with their own length and height. A ceiling is just one flat area, so this calculator simplifies that down to a single length × width input while keeping the ceiling-specific finish and primer notes front and center." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
