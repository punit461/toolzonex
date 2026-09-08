import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ppsr-check-cost-calculator",
    navName: "PPSR Check Cost Calculator",
    navDescription: "Estimate the total cost of PPSR searches in Australia.",
    name: "PPSR Check Cost Calculator (Australia)",
    description: "Estimate the total official government fee for one or more PPSR (Personal Property Securities Register) searches in Australia — $2 self-service or $7 assisted per search.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "PPSR Check Cost Calculator - How Much Does a PPSR Check Cost?",
    seoDescription: "Free PPSR check cost calculator for Australia. Estimate the total official government search fee ($2 self-service or $7 assisted) for one or more vehicles.",
    keywords: ["ppsr check", "ppsr check cost", "how much does a ppsr check cost", "ppsr search fee", "ppsr check calculator", "ppsr australia"],
    ogTitle: "PPSR Check Cost Calculator - How Much Does a PPSR Check Cost? | ToolZoneX",
    ogDescription: "Estimate the total official government fee for one or more PPSR searches in Australia — $2 self-service or $7 assisted per search.",
    schemaName: "PPSR Check Cost Calculator",
    schemaDescription: "Estimate the total official government fee for one or more PPSR searches in Australia.",
    applicationCategory: "FinanceApplication",
    currency: "AUD",
    faqs: [{ question: "Is a PPSR check free?", answer: "No — the official self-service search costs $2 per item through ppsr.gov.au. Some car history websites advertise a 'free' check but typically bundle it with a separate paid report." }, { question: "What do I need to run a PPSR search?", answer: "For a vehicle, you need the Vehicle Identification Number (VIN) or chassis number, which is the most reliable identifier." }, { question: "What does a PPSR search actually show?", answer: "It shows whether the item has a registered security interest (money owing to a finance company), and for vehicles, whether it's recorded as stolen or written off." }, { question: "Does this tool run the actual PPSR search?", answer: "No — it only estimates the total fee based on how many searches you plan to run. Run the real search at the official government site, ppsr.gov.au." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
