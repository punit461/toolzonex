import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/concrete-calculator",
    navName: "Concrete Calculator",
    navDescription: "Estimate concrete volume and cement bags needed.",
    name: "Concrete Calculator",
    description: "Calculate concrete volume for slabs, columns, and beams, and estimate the number of cement bags required.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Concrete Calculator - Volume & Cement Bags Estimator",
    seoDescription: "Free concrete calculator to estimate concrete volume for slabs, columns, and beams, with an approximate cement bag count for your project.",
    keywords: ["concrete calculator", "concrete volume calculator", "cement bag calculator", "slab concrete calculator", "column concrete calculator", "concrete estimator"],
    ogTitle: "Concrete Calculator - Volume & Cement Bags Estimator | ToolZoneX",
    ogDescription: "Estimate concrete volume for slabs, columns, and beams, and the cement bags required.",
    schemaName: "Concrete Calculator",
    schemaDescription: "Calculate concrete volume for slabs, columns, and beams and estimate cement bags required.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: [{ question: "How many cement bags per cubic meter?", answer: "This tool uses a rule-of-thumb of about 7 bags of 50 kg cement per cubic meter of concrete (a typical M20 mix). Actual usage varies with the mix design." }, { question: "Should I add extra for waste?", answer: "Yes — add roughly 5–10% to the calculated volume to cover spillage, uneven subgrade, and formwork variations." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
