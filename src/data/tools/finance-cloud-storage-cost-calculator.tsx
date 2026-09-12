import StorageIcon from '@mui/icons-material/Storage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cloud-storage-cost-calculator",
    navName: "Cloud Storage Cost Calculator",
    navDescription: "Monthly & annual cloud storage cost estimate.",
    name: "Cloud Storage Cost Calculator",
    description: "Estimate monthly and annual cloud storage cost from storage amount and a provider rate per GB, with common provider preset rates.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <StorageIcon fontSize="large" color="primary"/>,
    seoTitle: "Cloud Storage Cost Calculator - Monthly & Annual Estimate",
    seoDescription: "Free cloud storage cost calculator. Enter storage amount and rate per GB to estimate monthly and annual cloud storage cost.",
    keywords: ["cloud storage cost calculator", "aws s3 cost calculator", "cloud storage pricing calculator", "gcp storage cost calculator", "cloud storage cost estimator"],
    ogTitle: "Cloud Storage Cost Calculator - Monthly & Annual Estimate | ToolZoneX",
    ogDescription: "Estimate monthly and annual cloud storage cost from storage amount and rate.",
    schemaName: "Cloud Storage Cost Calculator",
    schemaDescription: "Estimate monthly and annual cloud storage cost from storage amount in GB/TB and a rate per GB.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Are these provider rates exact?", answer: "No — they're rounded, illustrative examples of common standard-tier pricing at the time of writing. Cloud storage pricing is tiered, region-specific, and changes over time, so always check the current pricing page for an exact number, or use the custom rate option with your actual quoted price." }, { question: "Does this include data transfer or API request costs?", answer: "No — this estimates storage cost only. Most cloud providers bill data egress (downloading data out) and API requests separately from storage, and those can add meaningfully to a real bill depending on usage patterns." }, { question: "Why do rates differ so much between storage classes?", answer: "Providers price storage classes based on access frequency and retrieval speed — \"archive\" or \"cold\" tiers cost far less per GB than standard storage but charge more (and take longer) to retrieve data, while frequently accessed data belongs in standard-tier storage despite the higher per-GB rate." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
