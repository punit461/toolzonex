import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/gcd-calculator",
    navName: "GCD Calculator",
    navDescription: "Greatest Common Divisor with Euclidean steps.",
    name: "GCD Calculator",
    description: "Calculate the Greatest Common Divisor (GCD) of two or more numbers using the Euclidean algorithm, with step-by-step working shown.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "GCD Calculator - Greatest Common Divisor with Steps",
    seoDescription: "Free GCD calculator to find the Greatest Common Divisor of two or more numbers using the Euclidean algorithm, with every step shown.",
    keywords: ["gcd calculator", "greatest common divisor calculator", "hcf calculator", "gcd of numbers", "euclidean algorithm calculator", "gcd with steps"],
    ogTitle: "GCD Calculator - Greatest Common Divisor with Steps | ToolZoneX",
    ogDescription: "Find the Greatest Common Divisor of two or more numbers with step-by-step working.",
    schemaName: "GCD Calculator",
    schemaDescription: "Calculate the Greatest Common Divisor of two or more numbers with step-by-step working.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the GCD of 1 and any number?", answer: "The GCD of 1 and any positive integer is always 1, because 1 is the only positive divisor of 1. This means the two numbers are \"coprime\" or \"relatively prime.\"" }, { question: "Can the GCD be larger than the smallest number?", answer: "No — the GCD of a set of numbers can never be larger than the smallest number in the set, since a divisor cannot be greater than the number it divides." }, { question: "What happens if I enter 0?", answer: "Zero is excluded from the calculation. If all entries are zero, the result will be 0. For any positive number n, GCD(n, 0) = n." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
