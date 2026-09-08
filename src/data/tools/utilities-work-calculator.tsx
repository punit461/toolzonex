import EngineeringIcon from '@mui/icons-material/Engineering';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/work-calculator",
    navName: "Work Calculator",
    navDescription: "Physics work done from force, distance, and angle.",
    name: "Work Calculator - Physics Work Done (W = Fd cos θ)",
    description: "Calculate physics work done from force, distance, and the angle between force and displacement.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EngineeringIcon fontSize="large" color="primary"/>,
    seoTitle: "Work Calculator - Physics Work Done (W = Fd cos θ)",
    seoDescription: "Free work calculator for physics. Enter force, distance, and angle to calculate work done using W = F × d × cos(θ).",
    keywords: ["work calculator", "work done formula", "physics work calculator", "force distance work calculator", "w = fd cos theta"],
    ogTitle: "Work Calculator - Physics Work Done | ToolZoneX",
    ogDescription: "Calculate work done from force, distance, and angle.",
    schemaName: "Work Calculator",
    schemaDescription: "Calculate physics work done from force, distance, and the angle between force and displacement.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What units does the result come out in?", answer: "If force is in newtons (N) and distance is in meters (m), the result is in joules (J) — the standard SI unit of work and energy. Keep your input units consistent for the result to make physical sense." }, { question: "Why does a 90° angle give zero work?", answer: "At 90°, the force is applied entirely perpendicular to the direction of motion, so cos(90°) = 0 — none of the force contributes to moving the object along its path, so no work is done in the physics sense, even if the object is moving." }, { question: "Can work be negative?", answer: "Yes — when the angle is greater than 90°, cosine becomes negative, meaning the force opposes the direction of motion (like friction slowing something down). Negative work represents energy being removed rather than added." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
