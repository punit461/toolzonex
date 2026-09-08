import EngineeringIcon from '@mui/icons-material/Engineering';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/beam-load-calculator",
    navName: "Beam Load Calculator",
    navDescription: "Estimate beam bending moment & deflection.",
    name: "Beam Load Calculator",
    description: "Estimate the maximum bending moment and deflection of a simply supported beam under a point or uniformly distributed load.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EngineeringIcon fontSize="large" color="primary"/>,
    seoTitle: "Beam Load Calculator - Bending Moment & Deflection",
    seoDescription: "Free beam load calculator. Estimate maximum bending moment and deflection for a simply supported beam under a point load or uniform load.",
    keywords: ["beam load calculator", "beam bending moment calculator", "beam deflection calculator", "simply supported beam calculator", "beam calculator"],
    ogTitle: "Beam Load Calculator - Bending Moment & Deflection | ToolZoneX",
    ogDescription: "Estimate bending moment and deflection for a simply supported beam.",
    schemaName: "Beam Load Calculator",
    schemaDescription: "Estimate maximum bending moment and deflection for a simply supported beam under a point load or uniformly distributed load.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this suitable for real construction projects?", answer: "No. This calculator provides a simplified estimate for basic reference and educational purposes only, based on idealized simply-supported-beam formulas. Real structural design must account for material safety factors, load combinations, dynamic and lateral loads, connection details, and local building codes — always consult a licensed structural engineer for any real construction project." }, { question: "What do E and I represent?", answer: "E is the modulus of elasticity (material stiffness, e.g. ~200 GPa for steel, ~10-13 GPa for typical structural timber), and I is the second moment of area (moment of inertia) of the beam's cross-section, which depends on its shape and dimensions. Both determine how much the beam deflects under load." }, { question: "What's the difference between a point load and a uniformly distributed load?", answer: "A point load acts at a single location, like a column resting on the beam, while a uniformly distributed load (UDL) is spread evenly across the beam's full length, like the weight of a floor or roof pressing down along the span." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
