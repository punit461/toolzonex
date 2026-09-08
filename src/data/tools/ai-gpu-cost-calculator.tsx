import MemoryIcon from '@mui/icons-material/Memory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/ai/gpu-cost-calculator",
    navName: "GPU Cloud Cost Calculator",
    navDescription: "Estimate A100, H100 & RTX cloud GPU rental costs.",
    name: "GPU Cloud Cost Calculator",
    description: "Estimate the cost of renting cloud GPUs like A100, H100, and RTX 4090 for AI training and inference.",
    navCategory: "AI",
    shellCategory: "AI",
    icon: <MemoryIcon fontSize="large" color="primary"/>,
    seoTitle: "GPU Cloud Cost Calculator - A100, H100 & RTX Pricing",
    seoDescription: "Free calculator to estimate cloud GPU rental costs for AI training and inference. Compare A100, H100, RTX 4090, and more across providers.",
    keywords: ["GPU cost calculator", "cloud GPU pricing", "A100 pricing", "H100 pricing", "GPU rental calculator", "AI training cost calculator", "GPU cloud comparison", "a100 cloud pricing", "gpu cloud cost", "gpu rental price tracker", "gpu rental cost", "gpu rent hourly", "gpu rental hourly"],
    ogTitle: "GPU Cloud Cost Calculator - A100, H100 & RTX Pricing | ToolZoneX",
    ogDescription: "Estimate cloud GPU rental costs for AI training and inference. Compare A100, H100, RTX 4090, and more.",
    schemaName: "GPU Cloud Cost Calculator",
    schemaDescription: "Estimate the cost of renting cloud GPUs like A100, H100, and RTX 4090 for AI training and inference.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "How much does it cost to rent an A100 GPU per hour?", answer: "On community cloud marketplaces, an A100 40GB runs roughly $1.10/hr and an A100 80GB roughly $1.49/hr as of August 2026. Hyperscalers like AWS/Azure charge more per GPU (around $3.40/hr for an A100 80GB) but bundle enterprise SLAs and support. Select an A100 option in the calculator above to see the exact rate used and your projected monthly/yearly cost." }, { question: "What's the hourly price for cloud GPU rental?", answer: "Cloud GPU rental hourly rates range widely by card and provider tier: budget/inference cards like the T4 start around $0.20/hr, mid-range cards like the RTX 4090 or A10 run $0.34-$0.75/hr, and high-end training cards like the A100 and H100 run roughly $1.10-$6.88/hr depending on GPU and whether it's a community-cloud or hyperscaler instance. Pick a GPU above to see its current hourly rate." }, { question: "How do I track or estimate GPU rental cost over a month?", answer: "Enter your GPU type, how many you need, and expected hours per month (730 hrs/mo for always-on, roughly 160 hrs/mo for business-hours-only usage) — the calculator multiplies the hourly rate by quantity and hours to project your monthly and yearly GPU cloud cost, and the comparison table lets you check how that cost changes across GPU tiers." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
