import MemoryIcon from '@mui/icons-material/Memory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cpu-bottleneck-calculator",
    navName: "CPU Bottleneck Calculator",
    navDescription: "Estimate CPU/GPU bottleneck risk by tier and resolution.",
    name: "CPU Bottleneck Calculator - Simplified Estimate",
    description: "Get a simplified, educational estimate of CPU bottleneck risk from CPU tier, GPU tier, and target resolution.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MemoryIcon fontSize="large" color="primary"/>,
    seoTitle: "CPU Bottleneck Calculator - Simplified Estimate",
    seoDescription: "Free CPU bottleneck calculator. Pick a CPU tier, GPU tier, and resolution for a simplified educational estimate of bottleneck risk.",
    keywords: ["cpu bottleneck calculator", "gpu bottleneck calculator", "will my cpu bottleneck my gpu", "bottleneck calculator pc", "cpu gpu bottleneck estimate"],
    ogTitle: "CPU Bottleneck Calculator | ToolZoneX",
    ogDescription: "A simplified educational estimate of CPU/GPU bottleneck risk.",
    schemaName: "CPU Bottleneck Calculator",
    schemaDescription: "Get a simplified, educational estimate of CPU bottleneck risk from CPU tier, GPU tier, and target resolution.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this based on real benchmark data?", answer: "No. This is a simplified educational tool that uses general performance tiers and resolution to illustrate the CPU/GPU bottleneck relationship — it doesn't query a live hardware database or real benchmark results for specific CPU and GPU models. For an accurate answer about a specific pairing, look up head-to-head benchmarks for those exact parts." }, { question: "Why does resolution affect the bottleneck risk?", answer: "Higher resolutions require the GPU to render dramatically more pixels per frame, shifting the workload balance toward the GPU. Lower resolutions render faster on the GPU side, so the CPU's ability to prepare frames quickly enough becomes the more common limiting factor." }, { question: "What should I do if my result shows a High bottleneck risk?", answer: "Consider either a stronger CPU tier, a more modest GPU tier, or a higher resolution/settings target that shifts more load onto the GPU — any of these narrows the gap this estimate is flagging. Again, treat this as a general educational signal rather than a precise verdict." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
