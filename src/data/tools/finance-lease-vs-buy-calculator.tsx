import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/lease-vs-buy-calculator",
    navName: "Lease vs Buy Calculator",
    navDescription: "Compare leasing vs buying a car or equipment.",
    name: "Lease vs Buy Calculator - Car & Equipment Comparison",
    description: "Compare the total cost of leasing versus buying a vehicle or piece of equipment over time.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Lease vs Buy Calculator - Car & Equipment Comparison",
    seoDescription: "Free lease vs buy calculator for cars and equipment. Compare monthly lease payments against loan payments and resale value to find the cheaper option.",
    keywords: ["lease vs buy calculator", "car lease vs buy calculator", "equipment lease vs buy calculator", "should i lease or buy a car", "lease or finance calculator"],
    ogTitle: "Lease vs Buy Calculator - Car & Equipment Comparison | ToolZoneX",
    ogDescription: "Compare the total cost of leasing versus buying a vehicle or piece of equipment.",
    schemaName: "Lease vs Buy Calculator",
    schemaDescription: "Compare the total cost of leasing versus buying a vehicle or equipment, including optional resale value.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does this account for mileage limits or lease-end fees?", answer: "No — this calculator focuses on the core payment comparison. Leases often include mileage limits, wear-and-tear charges, and disposition fees at the end of the term, which can add real cost beyond the monthly payment and should be factored in separately." }, { question: "Why does buying show a cost even after subtracting resale value?", answer: "Buying still involves paying interest on the loan and the asset's natural depreciation — the resale value simply recovers part of what you paid, it doesn't erase financing costs or depreciation entirely." }, { question: "Is leasing or buying always better?", answer: "Neither is universally better — leasing typically offers lower monthly payments and the option to upgrade more often, while buying builds ownership and equity over time and has no mileage or usage restrictions. The right choice depends on your budget, how long you plan to keep the vehicle or equipment, and how much you use it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
