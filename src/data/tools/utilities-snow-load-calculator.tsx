import AcUnitIcon from '@mui/icons-material/AcUnit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/snow-load-calculator",
    navName: "Snow Load Calculator",
    navDescription: "Estimate roof snow load from depth & density.",
    name: "Snow Load Calculator",
    description: "Estimate snow load in pounds per square foot from snow depth and a selected or manual snow density.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AcUnitIcon fontSize="large" color="primary"/>,
    seoTitle: "Snow Load Calculator - Estimate Roof Snow Load",
    seoDescription: "Free snow load calculator. Enter snow depth and type to estimate roof snow load in pounds per square foot.",
    keywords: ["snow load calculator", "roof snow load calculator", "snow weight calculator", "snow load psf calculator", "how much does snow weigh"],
    ogTitle: "Snow Load Calculator - Estimate Roof Snow Load | ToolZoneX",
    ogDescription: "Estimate snow load in pounds per square foot from snow depth and density.",
    schemaName: "Snow Load Calculator",
    schemaDescription: "Estimate snow load in pounds per square foot from snow depth and a selected or manual snow density.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this accurate enough for structural decisions?", answer: "No — this is a simplified estimate for general awareness only, not a substitute for a structural engineer's calculation. Real roof snow load design uses ground snow load maps, exposure and thermal factors, roof slope, and local building code requirements well beyond a simple depth-times-density estimate." }, { question: "Why does snow density vary so much?", answer: "Freshly fallen, fluffy powder traps a lot of air and is very light per unit volume. As snow sits, it settles and compacts under its own weight, and can also partially melt and refreeze, both of which dramatically increase its density and the load it puts on a surface." }, { question: "What should I do if I'm worried about roof snow load?", answer: "Contact a structural engineer or your local building department, especially after unusually heavy or wet snowfall, rather than relying on a rough estimate like this one for safety-critical decisions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
