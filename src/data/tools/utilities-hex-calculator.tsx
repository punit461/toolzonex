import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/hex-calculator",
    navName: "Hex Calculator",
    navDescription: "Add, subtract, multiply & divide hex.",
    name: "Hex Calculator",
    description: "Perform arithmetic on hexadecimal values and see results in hex, decimal, binary, and octal. Free online hex calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Hex Calculator - Hex to Decimal, Binary & Octal",
    seoDescription: "Free online hex calculator. Add, subtract, multiply, and divide hex values. See results in hex, decimal, binary, and octal.",
    keywords: ["hex calculator", "hexadecimal calculator", "hex to decimal", "hex addition", "hex to binary", "hex to octal", "base 16 calculator"],
    ogTitle: "Hex Calculator - Hex to Decimal, Binary & Octal | ToolZoneX",
    ogDescription: "Perform arithmetic on hex values and see conversion to decimal, binary, and octal.",
    schemaName: "Hex Calculator",
    schemaDescription: "Perform arithmetic on hexadecimal values and see results in hex, decimal, binary, and octal.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
