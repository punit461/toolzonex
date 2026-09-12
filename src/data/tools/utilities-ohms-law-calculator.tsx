import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ohms-law-calculator",
    navName: "Ohm's Law Calculator",
    navDescription: "Solve V, I, R & P with one unknown.",
    name: "Ohm's Law Calculator",
    description: "Solve any one of voltage, current, resistance, or power from the other two using the Ohm's law wheel formulas (V=IR, P=VI, P=I²R, P=V²/R).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Ohm's Law Calculator - Solve V, I, R & P Instantly",
    seoDescription: "Free Ohm's law calculator. Solve for voltage, current, resistance, or power when any two are known, using V=IR, P=VI, P=I²R, and P=V²/R with an Ohm's law wheel reference.",
    keywords: ["ohm's law calculator", "ohms law calculator", "voltage current resistance", "power calculator", "ohm law wheel", "voltage calculator", "resistance calculator", "electric power"],
    ogTitle: "Ohm's Law Calculator - Solve V, I, R & P Instantly | ToolZoneX",
    ogDescription: "Solve for voltage, current, resistance, or power from any two known values using the Ohm's law wheel.",
    schemaName: "Ohm's Law Calculator",
    schemaDescription: "Solve for voltage, current, resistance, or power from any two known values using the Ohm's law wheel.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How many fields do I need to fill in?", answer: "Enter any two of the four — voltage, current, resistance, or power — and leave the unknown one blank; the calculator determines the rest." }, { question: "Does Ohm's law apply to AC circuits?", answer: "This calculator assumes DC. For AC circuits with reactive components, impedance replaces simple resistance and phase angles come into play." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
