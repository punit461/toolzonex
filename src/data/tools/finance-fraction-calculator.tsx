import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/fraction-calculator",
    navName: "Fraction Calculator",
    navDescription: "Add, subtract, multiply & divide fractions.",
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions with instant simplification using GCD.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Fraction Calculator - Add, Subtract, Multiply & Divide Fractions",
    seoDescription: "Free fraction calculator to add, subtract, multiply, and divide fractions. Shows simplified fraction and decimal results instantly.",
    keywords: ["fraction calculator", "add fractions", "multiply fractions", "divide fractions", "subtract fractions", "simplify fraction", "fraction math"],
    ogTitle: "Fraction Calculator - Add, Subtract, Multiply & Divide Fractions | ToolZoneX",
    ogDescription: "Add, subtract, multiply, and divide fractions with instant simplification. Shows both fraction and decimal results.",
    schemaName: "Fraction Calculator",
    schemaDescription: "Add, subtract, multiply, and divide fractions with instant simplification.",
    applicationCategory: "CalculatorApplication",
    currency: undefined,
    faqs: [{ question: "What does simplified form mean?", answer: "The fraction is reduced so that the numerator and denominator share no common factor other than 1." }, { question: "Can I enter negative fractions?", answer: "Yes — enter a negative sign in the numerator field." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
