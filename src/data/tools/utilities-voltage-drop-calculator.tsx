import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/voltage-drop-calculator",
    navName: "Voltage Drop Calculator",
    navDescription: "Calculate voltage drop for wire runs.",
    name: "Voltage Drop Calculator",
    description: "Calculate voltage drop in DC and single-phase AC circuits based on wire length, gauge, current, and system voltage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Voltage Drop Calculator - Wire Gauge & Length",
    seoDescription: "Free voltage drop calculator for DC and AC circuits. Calculate voltage loss based on wire length, gauge, current, and system voltage.",
    keywords: ["voltage drop calculator", "wire voltage drop", "wire gauge calculator", "voltage drop formula", "NEC voltage drop"],
    ogTitle: "Voltage Drop Calculator - Wire Gauge & Length | ToolZoneX",
    ogDescription: "Calculate voltage drop in DC and single-phase AC circuits based on wire length, gauge, current, and system voltage.",
    schemaName: "Voltage Drop Calculator",
    schemaDescription: "Calculate voltage drop in DC and single-phase AC circuits based on wire length, gauge, current, and system voltage.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the recommended maximum voltage drop?", answer: "The NEC recommends no more than 3% voltage drop from the panel to the furthest outlet on a branch circuit, and no more than 5% total." }, { question: "Why does wire length matter?", answer: "Longer wire has more resistance, which causes a greater voltage drop. Doubling the wire length doubles the voltage drop." }, { question: "What wire resistance values are used?", answer: "The calculator uses NEC Chapter 9 Table 8 values for uncoated copper conductors at 75°C: 14 AWG = 2.525, 12 AWG = 1.588, 10 AWG = 0.999, 8 AWG = 0.628, and 6 AWG = 0.395 ohms per 1,000 feet." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
