import AssessmentIcon from '@mui/icons-material/Assessment';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/sample-size-calculator",
    navName: "Sample Size Calculator",
    navDescription: "Find the survey sample size you need.",
    name: "Sample Size Calculator",
    description: "Calculate the sample size needed for a survey or study using Cochran's formula with finite-population correction.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AssessmentIcon fontSize="large" color="primary"/>,
    seoTitle: "Sample Size Calculator - Survey & Study Sample Size",
    seoDescription: "Free sample size calculator using Cochran's formula with finite-population correction. Find the respondents needed for your survey or study.",
    keywords: ["sample size calculator", "survey sample size", "cochran's formula calculator", "statistical sample size", "research sample size calculator", "margin of error calculator"],
    ogTitle: "Sample Size Calculator - Survey & Study Sample Size | ToolZoneX",
    ogDescription: "Calculate the sample size needed for a survey or study using Cochran's formula.",
    schemaName: "Sample Size Calculator",
    schemaDescription: "Calculate the sample size needed for a survey or study using Cochran's formula with finite-population correction.",
    applicationCategory: "CalculatorApplication",
    currency: undefined,
    faqs: [{ question: "Why is p set to 0.5?", answer: "p = 0.5 maximizes p(1−p), giving the most conservative (largest) sample size — safest when you don't know the expected proportion." }, { question: "What does the finite-population correction do?", answer: "For small populations it reduces the required sample below the infinite-population estimate, since you're sampling a meaningful fraction of the whole group." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
