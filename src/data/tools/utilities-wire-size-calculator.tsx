import CableIcon from '@mui/icons-material/Cable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wire-size-calculator",
    navName: "Wire Size Calculator",
    navDescription: "Find AWG wire gauge from current & voltage drop.",
    name: "Wire Size Calculator - AWG Wire Gauge Finder",
    description: "Find the recommended AWG wire gauge from current, voltage, wire length, and maximum voltage drop, using a standard ampacity table.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CableIcon fontSize="large" color="primary"/>,
    seoTitle: "Wire Size Calculator - AWG Wire Gauge Finder",
    seoDescription: "Free online wire size calculator. Enter current, voltage, length, and max voltage drop to find the recommended AWG wire gauge instantly.",
    keywords: ["wire size calculator", "awg calculator", "wire gauge calculator", "voltage drop calculator", "ampacity calculator"],
    ogTitle: "Wire Size Calculator - AWG Wire Gauge Finder | ToolZoneX",
    ogDescription: "Find the right AWG wire gauge for your circuit instantly.",
    schemaName: "Wire Size Calculator",
    schemaDescription: "Find the recommended AWG wire gauge from current, voltage, wire length, and maximum voltage drop.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this a substitute for professional electrical code compliance?", answer: "No. This calculator gives a reasonable engineering estimate based on standard resistance and ampacity figures, but actual wire sizing must follow your local electrical code (such as the NEC), which accounts for insulation type, ambient temperature, conduit fill, and other derating factors. Always consult a licensed electrician for real installations." }, { question: "Why does wire length matter so much?", answer: "Voltage drop increases with the round-trip distance current has to travel, so doubling the length of a circuit run doubles the voltage drop for the same wire and current, often requiring a thicker gauge to compensate." }, { question: "What voltage drop percentage should I use?", answer: "3% is a commonly recommended maximum for branch circuits, and 5% for the combined feeder and branch circuit, though some equipment or codes may specify a different limit." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
