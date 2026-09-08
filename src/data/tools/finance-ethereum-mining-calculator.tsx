import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ethereum-mining-calculator",
    navName: "Ethereum Staking Calculator",
    navDescription: "Estimate ETH staking rewards.",
    name: "Ethereum Mining Calculator",
    description: "Estimate Ethereum staking rewards from your stake amount, ETH price, annual APY, and staking service fee — reframed around staking since Ethereum moved to Proof-of-Stake in 2022.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "Ethereum Mining Calculator - ETH Staking Rewards Estimator",
    seoDescription: "Free Ethereum staking rewards calculator. Enter stake amount, ETH price, annual APY, and service fee to estimate annual, monthly, and daily staking rewards.",
    keywords: ["ethereum mining calculator", "ethereum staking calculator", "eth staking rewards calculator", "eth staking apy calculator", "proof of stake calculator"],
    ogTitle: "Ethereum Mining Calculator - ETH Staking Rewards | ToolZoneX",
    ogDescription: "Estimate Ethereum staking rewards from stake amount, APY, and service fees.",
    schemaName: "Ethereum Mining Calculator",
    schemaDescription: "Estimate Ethereum staking rewards from stake amount, ETH price, annual APY, and staking service fee.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Can I still mine Ethereum with a GPU?", answer: "Not on Ethereum mainnet — mining ended with the Merge in September 2022. Some GPU miners moved to mining other proof-of-work coins instead, but Ethereum itself is validated entirely through staking now." }, { question: "How accurate is this staking reward estimate?", answer: "It's a simplified projection, not a guarantee. Actual staking APY fluctuates with total network stake and protocol parameters, ETH's price is highly volatile, and validators can face penalties (slashing) for downtime or misbehavior that reduce real returns below the estimate." }, { question: "What is the minimum to start staking?", answer: "Running your own validator requires exactly 32 ETH. Staking pools and most exchanges let you stake much smaller amounts by pooling funds with other users, usually in exchange for a service fee that reduces your net yield." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
