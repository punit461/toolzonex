import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/decimal-to-fraction-calculator",
    navName: "Decimal to Fraction Calculator",
    navDescription: "Convert decimals to simplified fractions.",
    name: "Decimal to Fraction Calculator - Convert & Simplify",
    description: "Convert a decimal number into a simplified fraction, including common repeating decimals, using a continued-fraction algorithm.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PieChartOutlineIcon fontSize="large" color="primary"/>,
    seoTitle: "Decimal to Fraction Calculator - Convert & Simplify",
    seoDescription: "Free online decimal to fraction calculator. Convert any decimal to a simplified fraction instantly, including common repeating decimals.",
    keywords: ["decimal to fraction calculator", "convert decimal to fraction", "fraction simplifier", "decimal to fraction converter", "repeating decimal to fraction"],
    ogTitle: "Decimal to Fraction Calculator - Convert & Simplify | ToolZoneX",
    ogDescription: "Convert any decimal number into a simplified fraction instantly.",
    schemaName: "Decimal to Fraction Calculator",
    schemaDescription: "Convert a decimal number into a simplified fraction using a continued-fraction algorithm.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this work for repeating decimals?", answer: "Yes, as long as you type enough repeating digits for the pattern to be recognizable (for example, 0.142857143 for 1/7). The algorithm finds the simplest fraction within a tiny tolerance of your input, which correctly recovers common repeating fractions when given sufficient precision." }, { question: "What about irrational numbers like π?", answer: "Irrational numbers (like π or √2) cannot be expressed as an exact fraction by definition. If you enter a truncated value like 3.14159265, the calculator will return the closest simple fraction it can find within its tolerance (such as the well-known approximation 355/113), but this is always an approximation, not an exact equivalent." }, { question: "Why is the denominator sometimes a large or unexpected number?", answer: "If a decimal doesn't match a simple fraction closely, the algorithm may need a larger denominator to represent it within the tolerance. Very long or seemingly random decimal inputs will tend to produce larger denominators than clean fractions like halves, thirds, or quarters." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
