import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/lcm-calculator",
    navName: "LCM Calculator",
    navDescription: "Least Common Multiple with factorization steps.",
    name: "LCM Calculator",
    description: "Calculate the Least Common Multiple (LCM) of two or more numbers, with a step-by-step prime factorization breakdown.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "LCM Calculator - Least Common Multiple with Steps",
    seoDescription: "Free LCM calculator to find the Least Common Multiple of two or more numbers, with a full prime factorization breakdown shown step by step.",
    keywords: ["lcm calculator", "least common multiple calculator", "lcm of numbers", "lcm with steps", "prime factorization calculator"],
    ogTitle: "LCM Calculator - Least Common Multiple with Steps | ToolZoneX",
    ogDescription: "Find the Least Common Multiple of two or more numbers with a prime factorization breakdown.",
    schemaName: "LCM Calculator",
    schemaDescription: "Calculate the Least Common Multiple of two or more numbers with a prime factorization breakdown.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is LCM different from GCD?", answer: "LCM (Least Common Multiple) is the smallest number that all your numbers divide into evenly, while GCD (Greatest Common Divisor) is the largest number that divides evenly into all of them. They're related by the formula LCM(a,b) × GCD(a,b) = a × b for two numbers." }, { question: "Can I find the LCM of more than two numbers?", answer: "Yes — add as many rows as you need. The prime factorization method used here scales naturally to any number of values by taking the highest power of each prime across every number entered." }, { question: "What happens if I enter a 0 or a negative number?", answer: "LCM is only defined for positive integers, so zero and negative entries are excluded from the calculation entirely — only enter positive whole numbers for a meaningful result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
