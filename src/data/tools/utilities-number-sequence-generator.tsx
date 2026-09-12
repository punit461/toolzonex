import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/number-sequence-generator",
    navName: "Number Sequence Generator",
    navDescription: "Generate arithmetic, geometric & Fibonacci sequences.",
    name: "Number Sequence Generator - Arithmetic, Geometric & Fibonacci",
    description: "Generate an arithmetic, geometric, or Fibonacci-style number sequence from custom starting values and a chosen number of terms.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Number Sequence Generator - Arithmetic, Geometric & Fibonacci",
    seoDescription: "Free number sequence generator. Create arithmetic, geometric, or Fibonacci-style sequences from custom starting values and term counts.",
    keywords: ["number sequence generator", "arithmetic sequence generator", "geometric sequence generator", "fibonacci sequence generator", "generate number pattern"],
    ogTitle: "Number Sequence Generator - Arithmetic, Geometric & Fibonacci | ToolZoneX",
    ogDescription: "Generate arithmetic, geometric, or Fibonacci-style number sequences.",
    schemaName: "Number Sequence Generator",
    schemaDescription: "Generate an arithmetic, geometric, or Fibonacci-style number sequence from custom starting values and a chosen number of terms.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What's the difference between Arithmetic and Geometric sequences?", answer: "An Arithmetic sequence adds the same fixed amount (the common difference) to get each next term, while a Geometric sequence multiplies by the same fixed amount (the common ratio) instead — arithmetic grows linearly, geometric grows exponentially." }, { question: "Does the Fibonacci-style option have to start with 1 and 1?", answer: "No — you can enter any two starting values, and each following term will still be the sum of the previous two, so you can generate Fibonacci-like sequences from any custom starting pair." }, { question: "Is there a limit on how many terms I can generate?", answer: "Yes, the tool caps generation at 500 terms to keep the output readable and the page responsive." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
