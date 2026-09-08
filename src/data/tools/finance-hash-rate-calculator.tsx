import MemoryIcon from '@mui/icons-material/Memory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/hash-rate-calculator",
    navName: "Hash Rate Calculator",
    navDescription: "Convert hash rate units & estimate block time.",
    name: "Hash Rate Calculator",
    description: "Convert mining hash rate between H/s, kH/s, MH/s, GH/s, TH/s, and PH/s, and estimate the average time to find a block at a given network difficulty.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <MemoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Hash Rate Calculator - Convert Hash Rate Units",
    seoDescription: "Free hash rate calculator. Convert between H/s, kH/s, MH/s, GH/s, TH/s, and PH/s, and estimate time to find a block at a given network difficulty.",
    keywords: ["hash rate calculator", "hash rate converter", "th/s to gh/s calculator", "mining hash rate calculator", "time to find block calculator"],
    ogTitle: "Hash Rate Calculator - Convert Hash Rate Units | ToolZoneX",
    ogDescription: "Convert hash rate between units and estimate time to find a block.",
    schemaName: "Hash Rate Calculator",
    schemaDescription: "Convert mining hash rate between units and estimate the average time to find a block at a given network difficulty.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between kH, MH, GH, TH, and PH?", answer: "Each step is a thousand times larger than the last: 1 kH/s = 1,000 H/s, 1 MH/s = 1,000 kH/s, 1 GH/s = 1,000 MH/s, 1 TH/s = 1,000 GH/s, and 1 PH/s = 1,000 TH/s. Modern ASIC miners are typically rated in TH/s or PH/s." }, { question: "How accurate is the time-to-find-a-block estimate?", answer: "It's a simplified statistical average, not a prediction — block discovery is random (Poisson-distributed), so an individual miner could find a block far sooner or much later than the average. Difficulty also changes roughly every two weeks, which shifts the real-world figure over time." }, { question: "Does a higher hash rate always mean more profit?", answer: "Not by itself — profit also depends on the hardware's power consumption, your electricity price, and pool fees. A more efficient miner with a lower hash rate can be more profitable than a faster one that draws far more power. Use a mining profitability calculator alongside this tool to see the full picture." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
