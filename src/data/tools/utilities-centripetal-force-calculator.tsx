import RotateRightIcon from '@mui/icons-material/RotateRight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/centripetal-force-calculator",
    navName: "Centripetal Force Calculator",
    navDescription: "Solve for force, mass, velocity, or radius.",
    name: "Centripetal Force Calculator - F = mv²/r Calculator",
    description: "Calculate centripetal force from mass, velocity, and radius, or solve for any one of the four given the other three.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <RotateRightIcon fontSize="large" color="primary"/>,
    seoTitle: "Centripetal Force Calculator - F = mv²/r Calculator",
    seoDescription: "Free centripetal force calculator for circular motion. Solve for force, mass, velocity, or radius given the other values.",
    keywords: ["centripetal force calculator", "circular motion force calculator", "f = mv2/r calculator", "centripetal force formula", "solve for centripetal force"],
    ogTitle: "Centripetal Force Calculator - F = mv²/r Calculator | ToolZoneX",
    ogDescription: "Calculate centripetal force, mass, velocity, or radius for circular motion.",
    schemaName: "Centripetal Force Calculator",
    schemaDescription: "Calculate centripetal force from mass, velocity, and radius, or solve for any one of the four given the other three.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Force Calculator?", answer: "The Force Calculator uses Newton's second law (F = ma) for straight-line, linear force. This calculator is specifically for objects moving in a circular path, where the force depends on mass, velocity, and the radius of the circle rather than linear acceleration." }, { question: "What units does this use?", answer: "Standard SI units: mass in kilograms, velocity in meters per second, radius in meters, and force in newtons." }, { question: "Why does force increase so much with speed?", answer: "Velocity is squared in the formula, so doubling the speed while keeping mass and radius the same quadruples the required centripetal force — this is why tight, high-speed turns require dramatically more force than slower ones." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
