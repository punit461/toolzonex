import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/rule-of-three-calculator",
    navName: "Rule of Three",
    navDescription: "Solve proportional problems.",
    name: "Rule of Three Calculator",
    description: "Solve proportions instantly with our Rule of Three calculator. Enter three values to find the fourth unknown value.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Rule of Three Calculator - Solve Proportions Online",
    seoDescription: "Solve proportions instantly with our Rule of Three calculator. Enter three values to find the fourth unknown value.",
    keywords: ["rule of three calculator", "proportion calculator", "cross multiplication calculator", "ratio calculator"],
    ogTitle: "Rule of Three Calculator - Solve Proportions Online | ToolZoneX",
    ogDescription: "Solve proportions instantly with our Rule of Three calculator.",
    schemaName: "Rule of Three Calculator",
    schemaDescription: "Solve proportions instantly with our Rule of Three calculator.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
