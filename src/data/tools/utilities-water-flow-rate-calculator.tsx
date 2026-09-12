import WavesIcon from '@mui/icons-material/Waves';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/water-flow-rate-calculator",
    navName: "Water Flow Rate Calculator",
    navDescription: "Calculate flow rate from a timed test.",
    name: "Water Flow Rate Calculator",
    description: "Calculate water flow rate in GPM or L/min from a simple timed measurement — how long it takes to fill a container of known volume.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WavesIcon fontSize="large" color="primary"/>,
    seoTitle: "Water Flow Rate Calculator - GPM From a Timed Bucket Test",
    seoDescription: "Free water flow rate calculator. Enter volume collected and time taken to calculate flow rate in GPM and L/min, no pipe diameter needed.",
    keywords: ["water flow rate calculator", "gpm calculator", "flow rate from bucket test", "how to measure water flow rate", "water flow calculator"],
    ogTitle: "Water Flow Rate Calculator - GPM From a Timed Bucket Test | ToolZoneX",
    ogDescription: "Calculate water flow rate from a simple timed bucket test.",
    schemaName: "Water Flow Rate Calculator",
    schemaDescription: "Calculate water flow rate in GPM or L/min from a simple timed measurement — how long it takes to fill a container of known volume.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why measure flow rate this way instead of from pipe diameter?", answer: "Calculating flow from pipe diameter and velocity requires knowing the fluid's velocity, which most people can't easily measure at home. Timing how long it takes to fill a known-volume container is a simple, practical measurement anyone can do with just a bucket and a stopwatch, and it captures the real-world effects of pressure and restrictions that a theoretical pipe calculation might miss." }, { question: "Does the container size matter for accuracy?", answer: "A larger container measured over a longer time generally gives a more accurate average flow rate, since it smooths out small timing errors. A 1-gallon container timed over just a couple of seconds is more sensitive to stopwatch reaction time than a 5-gallon bucket timed over 20+ seconds." }, { question: "Will the flow rate stay constant over time?", answer: "Not necessarily — water pressure can fluctuate with other fixtures being used simultaneously, well pump cycling, or municipal supply changes. Take a few measurements at different times for a more reliable picture of typical flow rate." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
