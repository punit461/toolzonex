import ScaleIcon from '@mui/icons-material/Scale';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pipe-weight-calculator",
    navName: "Pipe Weight Calculator",
    navDescription: "Weigh a pipe by size and material.",
    name: "Pipe Weight Calculator",
    description: "Calculate the weight of a pipe by outer diameter, wall thickness, length, and material. Free online pipe weight calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ScaleIcon fontSize="large" color="primary"/>,
    seoTitle: "Pipe Weight Calculator - Steel, Aluminum & PVC Pipe Weight",
    seoDescription: "Free online pipe weight calculator. Enter outer diameter, wall thickness, and length to get pipe weight in kg, pounds, and per-foot values for any material.",
    keywords: ["pipe weight calculator", "steel pipe weight", "pipe weight per foot", "ms pipe weight", "pipe weight formula", "pvc pipe weight"],
    ogTitle: "Pipe Weight Calculator - Steel & PVC Pipe Weight | ToolZoneX",
    ogDescription: "Calculate pipe weight by diameter, wall thickness, length, and material.",
    schemaName: "Pipe Weight Calculator",
    schemaDescription: "Calculate the weight of a pipe from its dimensions and material density.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is pipe weight calculated?", answer: "The calculator finds the cross-sectional area of the pipe wall (outer circle minus hollow inner circle), multiplies by the length, then by the material density. Weight = π × (OD² − ID²) / 4 × length × density." }, { question: "What densities does it use?", answer: "Typical values: mild/carbon steel 7850 kg/m³, stainless steel 8000 kg/m³, aluminum 2700 kg/m³, copper 8940 kg/m³, and PVC 1400 kg/m³." }, { question: "Does the weight include internal liquid?", answer: "No — it reports the empty pipe weight, plus a separate figure for the weight of water the pipe can hold if filled, so you can compare both." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
