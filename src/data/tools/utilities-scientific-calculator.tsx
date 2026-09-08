import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/scientific-calculator",
    navName: "Scientific Calculator",
    navDescription: "Advanced math operations.",
    name: "Scientific Calculator",
    description: "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Scientific Calculator - Advanced Math Online",
    seoDescription: "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
    keywords: ["scientific calculator", "advanced calculator", "trigonometry calculator", "math calculator online"],
    ogTitle: "Scientific Calculator - Advanced Math Online | ToolZoneX",
    ogDescription: "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
    schemaName: "Scientific Calculator",
    schemaDescription: "Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
