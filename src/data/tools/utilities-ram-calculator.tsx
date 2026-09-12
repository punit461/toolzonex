import MemoryIcon from '@mui/icons-material/Memory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ram-calculator",
    navName: "RAM Calculator",
    navDescription: "Calculate RAM capacity & memory bandwidth.",
    name: "RAM Calculator",
    description: "Calculate total RAM capacity from installed sticks, or theoretical memory bandwidth from RAM speed and bus width.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MemoryIcon fontSize="large" color="primary"/>,
    seoTitle: "RAM Calculator - Memory Capacity & Bandwidth",
    seoDescription: "Free RAM calculator. Calculate total installed RAM capacity, or theoretical memory bandwidth in GB/s from RAM speed and bus width.",
    keywords: ["ram calculator", "memory bandwidth calculator", "ram capacity calculator", "total ram calculator", "memory speed calculator"],
    ogTitle: "RAM Calculator - Memory Capacity & Bandwidth | ToolZoneX",
    ogDescription: "Calculate total RAM capacity or theoretical memory bandwidth.",
    schemaName: "RAM Calculator",
    schemaDescription: "Calculate total RAM capacity from sticks and per-stick capacity, or theoretical memory bandwidth from RAM speed and bus width.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why is the bus width usually 64 bits?", answer: "A standard single memory channel on desktop and laptop platforms has a 64-bit (8-byte) wide data path, which is why 64 is the default here. Some specialized systems use wider or narrower buses, which you can enter manually." }, { question: "Is this the real-world bandwidth I'll see?", answer: "This is the theoretical peak bandwidth for a single channel at the rated speed. Actual achieved bandwidth is typically lower due to memory controller overhead, timings/latency, and whether you're running in single-, dual-, or quad-channel mode — multiply by the number of channels for a rough multi-channel estimate." }, { question: "Does more RAM capacity mean faster performance?", answer: "Not directly — capacity determines how much data can be held in memory at once, while bandwidth (driven by speed and channel count) determines how fast that data can be read and written. Both matter, but for different reasons: capacity avoids swapping to disk, while bandwidth affects throughput-sensitive tasks." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
