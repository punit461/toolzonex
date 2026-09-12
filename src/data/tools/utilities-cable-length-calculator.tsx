import CableIcon from '@mui/icons-material/Cable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cable-length-calculator",
    navName: "Cable Length Calculator",
    navDescription: "Total cable length to buy for a run.",
    name: "Cable Length Calculator",
    description: "Estimate the total cable length to buy for a run from the straight-line distance plus a slack allowance for corners and connections.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CableIcon fontSize="large" color="primary"/>,
    seoTitle: "Cable Length Calculator - How Much Cable to Buy",
    seoDescription: "Free cable length calculator. Enter the straight-line distance and a slack allowance to estimate total cable length needed for a run.",
    keywords: ["cable length calculator", "how much cable do i need", "cable run length calculator", "wire length calculator", "cable slack calculator"],
    ogTitle: "Cable Length Calculator - How Much Cable to Buy | ToolZoneX",
    ogDescription: "Estimate total cable length needed for a run from distance plus a slack allowance.",
    schemaName: "Cable Length Calculator",
    schemaDescription: "Estimate the total cable length to buy for a run from the straight-line distance plus a slack allowance for corners and connections.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from a wire gauge calculator?", answer: "This tool estimates how much total cable length to buy for a run. It doesn't determine what thickness (gauge) of wire you need for safety and voltage drop — for that, use our Wire Size Calculator, which sizes AWG gauge based on current and voltage drop over a given run length." }, { question: "How much slack allowance should I use?", answer: "10-15% covers most straightforward runs with a few corners. Runs with many bends, obstacles, or where you need extra service loop at equipment racks may warrant 20% or more." }, { question: "Should I round up the final number?", answer: "Yes — cable is typically sold in fixed roll or spool lengths, so round the calculated total up to the next available length rather than trying to buy an exact fractional amount." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
