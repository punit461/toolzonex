import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pipe-flow-calculator",
    navName: "Pipe Flow Calculator",
    navDescription: "Calculate volumetric flow rate from pipe size and velocity.",
    name: "Pipe Flow Calculator - Volumetric Flow Rate (Q = A × v)",
    description: "Calculate volumetric flow rate through a pipe from its diameter and fluid velocity, in GPM, L/min, or m³/s.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "Pipe Flow Calculator - Volumetric Flow Rate (Q = A × v)",
    seoDescription: "Free pipe flow calculator. Enter pipe diameter and fluid velocity to calculate flow rate in GPM, L/min, or m³/s using Q = A × v.",
    keywords: ["pipe flow calculator", "flow rate calculator", "gpm calculator", "pipe velocity to flow rate", "volumetric flow rate calculator"],
    ogTitle: "Pipe Flow Calculator - Volumetric Flow Rate | ToolZoneX",
    ogDescription: "Calculate volumetric flow rate through a pipe from diameter and velocity.",
    schemaName: "Pipe Flow Calculator",
    schemaDescription: "Calculate volumetric flow rate through a pipe from its diameter and fluid velocity.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this assume the pipe is completely full?", answer: "Yes — this calculates flow for steady, incompressible flow through a pipe running completely full. Partially filled pipes (like open channels or gravity drains that aren't flowing full) need a different open-channel flow formula, since the wetted cross-sectional area is smaller than the full pipe area." }, { question: "What if I know the flow rate and need the velocity instead?", answer: "Rearrange the same formula: velocity = flow rate ÷ cross-sectional area. Calculate the pipe's area from its diameter using the formula above, then divide your known flow rate by that area." }, { question: "Why does pipe diameter matter so much to flow rate?", answer: "Cross-sectional area scales with the square of the diameter, so doubling a pipe's diameter quadruples its area — and therefore roughly quadruples the flow rate at the same fluid velocity." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
