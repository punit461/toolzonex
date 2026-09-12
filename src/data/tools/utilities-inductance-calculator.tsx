import CableIcon from '@mui/icons-material/Cable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/inductance-calculator",
    navName: "Inductance Calculator",
    navDescription: "Calculate solenoid inductance from turns and geometry.",
    name: "Inductance Calculator - Solenoid Inductance",
    description: "Calculate the inductance of an air-core solenoid from the number of turns, coil length, and coil radius.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CableIcon fontSize="large" color="primary"/>,
    seoTitle: "Inductance Calculator - Solenoid Inductance",
    seoDescription: "Free inductance calculator for air-core solenoids. Enter turns, coil length, and radius to calculate inductance using L = μ0N²A/l.",
    keywords: ["inductance calculator", "solenoid inductance calculator", "coil inductance calculator", "inductor calculator", "l = mu0 n2 a l calculator"],
    ogTitle: "Inductance Calculator | ToolZoneX",
    ogDescription: "Calculate solenoid inductance from turns, length, and radius.",
    schemaName: "Inductance Calculator",
    schemaDescription: "Calculate the inductance of an air-core solenoid from the number of turns, coil length, and coil radius.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is μ₀ (mu-naught)?", answer: "μ₀ is the permeability of free space, a physical constant equal to about 4π × 10⁻⁷ henries per meter (H/m). It describes how easily a magnetic field can form in a vacuum (or air, which is very close to vacuum for this purpose) and appears in this formula because the coil here has an air core." }, { question: "Does this work for coils with a magnetic core?", answer: "No — this assumes an air-core coil. Adding a ferromagnetic core (like iron or ferrite) multiplies the inductance by that material's relative permeability (μr), which can be dozens or hundreds of times higher than air, so a cored inductor's actual inductance will be much higher than this result." }, { question: "Does wire gauge or turn spacing matter?", answer: "Not directly in this formula — it assumes turns are wound evenly along the given coil length, regardless of the wire's thickness. Wire gauge determines how many turns physically fit in that length, but once you know the turn count and length, the inductance formula itself doesn't need the gauge." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
