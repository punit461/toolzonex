import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/force-calculator",
    navName: "Force Calculator",
    navDescription: "Solve for force, mass, or acceleration (F = ma).",
    name: "Force Calculator - F = ma Calculator",
    description: "Calculate force from mass and acceleration, or solve for mass or acceleration given the other two variables.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PrecisionManufacturingIcon fontSize="large" color="primary"/>,
    seoTitle: "Force Calculator - F = ma Calculator",
    seoDescription: "Free force calculator using Newton's second law. Solve for force, mass, or acceleration given the other two values.",
    keywords: ["force calculator", "f = ma calculator", "newtons second law calculator", "mass acceleration force calculator", "solve for force"],
    ogTitle: "Force Calculator - F = ma Calculator | ToolZoneX",
    ogDescription: "Calculate force, mass, or acceleration using Newton's second law.",
    schemaName: "Force Calculator",
    schemaDescription: "Calculate force from mass and acceleration, or solve for mass or acceleration given the other two variables.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What units does this calculator use?", answer: "Standard SI units: mass in kilograms (kg), acceleration in meters per second squared (m/s²), and force in newtons (N), where 1 newton is the force needed to accelerate 1 kg at 1 m/s²." }, { question: "Does this account for gravity or friction?", answer: "No — this calculates the net force from Newton's second law directly. To find weight (the force of gravity on an object), use mass × 9.8 m/s² as the acceleration. Friction or other opposing forces would need to be added or subtracted separately." }, { question: "Can mass or acceleration be zero?", answer: "Mass being zero would make force zero regardless of acceleration, and solving for mass or acceleration requires dividing by the other value, so that value can't be zero in those cases." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
