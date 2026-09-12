import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/kinetic-energy-calculator",
    navName: "Kinetic Energy Calculator",
    navDescription: "Solve for kinetic energy, mass, or velocity.",
    name: "Kinetic Energy Calculator - KE = 0.5mv²",
    description: "Calculate kinetic energy from mass and velocity, or solve for mass or velocity given the other two variables.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Kinetic Energy Calculator - KE = 0.5mv²",
    seoDescription: "Free kinetic energy calculator. Solve for kinetic energy, mass, or velocity using KE = 0.5 × m × v².",
    keywords: ["kinetic energy calculator", "ke calculator", "0.5mv2 calculator", "kinetic energy formula calculator", "solve for kinetic energy"],
    ogTitle: "Kinetic Energy Calculator - KE = 0.5mv² | ToolZoneX",
    ogDescription: "Calculate kinetic energy, mass, or velocity.",
    schemaName: "Kinetic Energy Calculator",
    schemaDescription: "Calculate kinetic energy from mass and velocity, or solve for mass or velocity given the other two variables.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What units does this calculator use?", answer: "Standard SI units: mass in kilograms (kg), velocity in meters per second (m/s), and kinetic energy in joules (J), where 1 joule is the energy of a 1 kg object moving in a way that satisfies the formula above." }, { question: "Does the direction of velocity matter?", answer: "No — kinetic energy depends on velocity squared, so only the object's speed (the magnitude of its velocity) matters, not its direction. A negative velocity value produces the same kinetic energy as the equivalent positive value." }, { question: "Why does speed matter more than mass for kinetic energy?", answer: "Because kinetic energy scales with the square of velocity but only linearly with mass, doubling an object's speed quadruples its kinetic energy, while doubling its mass only doubles it — which is why speed has such an outsized effect on impact energy." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
