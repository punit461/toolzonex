import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/binary-calculator",
    navName: "Binary Calculator",
    navDescription: "Add, subtract, multiply & divide binary numbers.",
    name: "Binary Calculator",
    description: "Perform arithmetic on binary numbers, with results shown in binary, decimal, hexadecimal, and octal, plus conversions of each input.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "Binary Calculator - Add, Subtract, Multiply & Divide Binary",
    seoDescription: "Free binary calculator to add, subtract, multiply, and divide binary (base-2) numbers, with results in binary, decimal, hex, and octal.",
    keywords: ["binary calculator", "binary addition calculator", "binary subtraction", "binary multiplication calculator", "binary division calculator", "binary to decimal", "hex binary octal calculator"],
    ogTitle: "Binary Calculator - Add, Subtract, Multiply & Divide Binary | ToolZoneX",
    ogDescription: "Perform arithmetic on binary numbers with results in binary, decimal, hex, and octal.",
    schemaName: "Binary Calculator",
    schemaDescription: "Perform arithmetic on binary numbers with conversions to decimal, hex, and octal.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if I enter invalid binary digits?", answer: "Only 0s and 1s are valid in binary. If you enter other digits (like 2 or 3), they will be ignored and the result will reflect only the valid binary digits in order." }, { question: "Can I divide binary numbers?", answer: "Yes — division is supported. If the result is not a whole number, the decimal value is shown (e.g. 1010 ÷ 11 = 11.1 in binary, which is 10 ÷ 3 ≈ 3.3333 in decimal)." }, { question: "Why show the result in multiple bases?", answer: "Different bases are useful in different contexts: binary for low-level computing, hex for memory addresses and color codes, octal for Unix file permissions, and decimal for everyday use." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
