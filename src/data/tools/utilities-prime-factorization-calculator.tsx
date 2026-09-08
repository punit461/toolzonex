import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/prime-factorization-calculator",
    navName: "Prime Factorization Calculator",
    navDescription: "Break a number into its prime factors.",
    name: "Prime Factorization Calculator",
    description: "Break any integer down into its prime factors with the step-by-step division shown, using the Fundamental Theorem of Arithmetic.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Prime Factorization Calculator - Prime Factors with Steps",
    seoDescription: "Free prime factorization calculator to break any integer into its prime factors, with the full division process shown step by step.",
    keywords: ["prime factorization calculator", "prime factors of a number", "factor tree calculator", "prime factorization with steps", "prime factor calculator"],
    ogTitle: "Prime Factorization Calculator - Prime Factors with Steps | ToolZoneX",
    ogDescription: "Break any integer into its prime factors with step-by-step division shown.",
    schemaName: "Prime Factorization Calculator",
    schemaDescription: "Break an integer into its prime factors with step-by-step division shown.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is prime factorization unique?", answer: "Yes — the Fundamental Theorem of Arithmetic guarantees that every integer greater than 1 has exactly one prime factorization (up to the order of the factors)." }, { question: "How do I factor very large numbers?", answer: "For very large numbers (hundreds of digits), prime factorization becomes computationally expensive. This calculator handles numbers that fit within standard integer ranges. For extremely large numbers, specialized algorithms like the General Number Field Sieve are used." }, { question: "What is the prime factorization of a prime number?", answer: "A prime number's only prime factor is itself. For example, 17 = 17¹ — it cannot be broken down further." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
