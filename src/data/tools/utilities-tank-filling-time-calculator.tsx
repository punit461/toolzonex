import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tank-filling-time-calculator",
    navName: "Tank Filling Time Calculator",
    navDescription: "Time to fill a tank from volume and fill rate.",
    name: "Tank Filling Time Calculator",
    description: "Calculate the time to fill a tank from its volume, fill rate, and an optional already-filled percentage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "Tank Filling Time Calculator - Fill Time in Minutes",
    seoDescription: "Free tank filling time calculator. Enter tank volume, fill rate, and already-filled percentage to calculate fill time in minutes and hours.",
    keywords: ["tank filling time calculator", "how long to fill a tank", "tank fill rate calculator", "pool filling time calculator", "water tank fill time"],
    ogTitle: "Tank Filling Time Calculator - Fill Time in Minutes | ToolZoneX",
    ogDescription: "Calculate the time to fill a tank based on volume, fill rate, and already-filled percentage.",
    schemaName: "Tank Filling Time Calculator",
    schemaDescription: "Calculate fill time in minutes as volume times one minus already-filled percentage, divided by fill rate.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What if my fill rate slows down as the tank fills?", answer: "This calculator assumes a constant fill rate, which is accurate for most pumps and hoses at typical pressures. If your real flow rate drops noticeably as backpressure builds (common with some gravity-fed systems), treat the result as an estimate on the faster side." }, { question: "Can I use this for draining a tank instead of filling it?", answer: "The math is the same in reverse — enter the volume that needs to drain as your \"volume\" and your drain rate as the \"fill rate\" to get the time to empty." }, { question: "Does the unit (gallons vs liters) matter for the calculation?", answer: "No — as long as your volume and fill rate use the same unit, the calculated time in minutes is correct regardless of which unit you pick. The toggle is just there to label your inputs clearly." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
