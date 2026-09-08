import LayersIcon from '@mui/icons-material/Layers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/drywall-calculator",
    navName: "Drywall Calculator",
    navDescription: "Drywall sheets needed from wall area.",
    name: "Drywall Calculator",
    description: "Calculate the number of drywall sheets needed from wall area, sheet size, and a waste percentage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LayersIcon fontSize="large" color="primary"/>,
    seoTitle: "Drywall Calculator - Sheets Needed",
    seoDescription: "Free drywall calculator. Enter wall area, sheet size (4x8 or 4x12 ft), and waste percentage to find how many drywall sheets you need.",
    keywords: ["drywall calculator", "how many sheets of drywall do i need", "drywall sheets calculator", "sheetrock calculator", "drywall estimator"],
    ogTitle: "Drywall Calculator - Sheets Needed | ToolZoneX",
    ogDescription: "Calculate the number of drywall sheets needed from wall area and sheet size.",
    schemaName: "Drywall Calculator",
    schemaDescription: "Calculate drywall sheets needed from wall area, sheet size, and waste percentage.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What waste percentage should I use?", answer: "10% is a reasonable default for a straightforward room. Rooms with lots of doors, windows, angled ceilings, or complex cuts often warrant 15-20% to avoid running short mid-job." }, { question: "Should I subtract door and window openings first?", answer: "This calculator doesn't subtract openings automatically — the waste percentage is meant to roughly absorb that. For a very precise count, you can manually reduce a wall's entered area to account for large openings and rely on a smaller waste percentage instead." }, { question: "When should I use 4×12 sheets instead of 4×8?", answer: "Longer 4×12 ft sheets cover more wall per sheet and leave fewer seams to tape and mud, which can look better on tall or long walls, but they're heavier and harder to handle alone. Standard 4×8 sheets remain the easiest to transport and hang for most residential jobs." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
