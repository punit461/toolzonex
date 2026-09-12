import AccountTreeIcon from '@mui/icons-material/AccountTree';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/matrix-calculator",
    navName: "Matrix Calculator",
    navDescription: "Add, subtract, multiply, invert & transpose matrices.",
    name: "Matrix Calculator",
    description: "Perform matrix addition, subtraction, multiplication, determinant, inverse, and transpose on 2×2 and 3×3 matrices.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountTreeIcon fontSize="large" color="primary"/>,
    seoTitle: "Matrix Calculator - Add, Multiply, Invert & Transpose",
    seoDescription: "Free matrix calculator for 2×2 and 3×3 matrices. Add, subtract, multiply, transpose, and find the determinant or inverse instantly.",
    keywords: ["matrix calculator", "matrix multiplication calculator", "matrix inverse calculator", "matrix determinant calculator", "matrix transpose calculator", "linear algebra calculator"],
    ogTitle: "Matrix Calculator - Add, Multiply, Invert & Transpose | ToolZoneX",
    ogDescription: "Perform matrix addition, subtraction, multiplication, determinant, inverse, and transpose instantly.",
    schemaName: "Matrix Calculator",
    schemaDescription: "Perform matrix addition, subtraction, multiplication, determinant, inverse, and transpose on 2x2 and 3x3 matrices.",
    applicationCategory: "CalculatorApplication",
    currency: undefined,
    faqs: [{ question: "What happens if a matrix is not invertible?", answer: "A matrix whose determinant is zero is \"singular\" and has no inverse. This tool shows a Singular matrix message instead of a numeric result." }, { question: "Can I multiply matrices of different sizes here?", answer: "This tool keeps both matrices the same square size (2×2 or 3×3) so addition, subtraction, and multiplication are always defined." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
