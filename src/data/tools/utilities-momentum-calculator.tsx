import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/momentum-calculator",
    navName: "Momentum Calculator",
    navDescription: "Solve for momentum, mass, or velocity.",
    name: "Momentum Calculator - p = mv",
    description: "Calculate momentum from mass and velocity, or solve for mass or velocity given the other two variables.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Momentum Calculator - p = mv",
    seoDescription: "Free momentum calculator. Solve for momentum, mass, or velocity using p = m × v.",
    keywords: ["momentum calculator", "p = mv calculator", "linear momentum calculator", "solve for momentum", "momentum formula calculator"],
    ogTitle: "Momentum Calculator - p = mv | ToolZoneX",
    ogDescription: "Calculate momentum, mass, or velocity.",
    schemaName: "Momentum Calculator",
    schemaDescription: "Calculate momentum from mass and velocity, or solve for mass or velocity given the other two variables.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What units does this calculator use?", answer: "Standard SI units: mass in kilograms (kg), velocity in meters per second (m/s), and momentum in kilogram-meters per second (kg·m/s)." }, { question: "Is momentum the same as kinetic energy?", answer: "No — momentum (p = m × v) scales linearly with velocity, while kinetic energy (KE = 0.5 × m × v²) scales with velocity squared. Two objects can have the same momentum but different kinetic energy, or vice versa, if their masses and speeds differ in the right way." }, { question: "Can momentum be negative?", answer: "Yes — momentum is a vector quantity, so its sign reflects direction. A negative velocity (moving in the opposite direction of your chosen positive direction) produces a negative momentum value, which matters when adding up momentum across multiple objects." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
