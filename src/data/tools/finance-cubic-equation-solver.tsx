import FunctionsIcon from '@mui/icons-material/Functions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cubic-equation-solver",
    navName: "Cubic Equation Solver",
    navDescription: "Solve ax³+bx²+cx+d=0 for real and complex roots.",
    name: "Cubic Equation Solver",
    description: "Solve any cubic equation ax³ + bx² + cx + d = 0 for its real and complex roots using Cardano's method.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FunctionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Cubic Equation Solver - Find Real & Complex Roots",
    seoDescription: "Free cubic equation solver for ax³ + bx² + cx + d = 0. Get real and complex roots instantly using Cardano's method with a trigonometric fallback.",
    keywords: ["cubic equation solver", "solve cubic equation", "cardano's method calculator", "cubic formula calculator", "cubic roots calculator", "polynomial solver"],
    ogTitle: "Cubic Equation Solver - Find Real & Complex Roots | ToolZoneX",
    ogDescription: "Solve ax³ + bx² + cx + d = 0 for real and complex roots instantly.",
    schemaName: "Cubic Equation Solver",
    schemaDescription: "Solve a cubic equation for its real and complex roots using Cardano's method.",
    applicationCategory: "CalculatorApplication",
    currency: undefined,
    faqs: [{ question: "Why do I sometimes get complex roots?", answer: "A cubic always has three roots (counting multiplicity). When the discriminant is positive, only one is real and the other two are complex conjugates — the tool shows all of them." }, { question: "What if a = 0?", answer: "The equation is no longer cubic. The solver degrades gracefully to a quadratic/linear solve so you still get the available real roots." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
