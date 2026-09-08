import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/quadratic-equation-solver",
    navName: "Quadratic Equation Solver",
    navDescription: "Roots, discriminant & vertex form for ax²+bx+c=0.",
    name: "Quadratic Equation Solver",
    description: "Solve any quadratic equation ax² + bx + c = 0 for its roots, discriminant, and vertex form.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "Quadratic Equation Solver - Roots, Discriminant & Vertex",
    seoDescription: "Free quadratic equation solver for ax² + bx + c = 0. Get real or complex roots, the discriminant, and vertex form instantly from your coefficients.",
    keywords: ["quadratic equation solver", "quadratic formula calculator", "solve quadratic equation", "discriminant calculator", "vertex form calculator"],
    ogTitle: "Quadratic Equation Solver - Roots, Discriminant & Vertex | ToolZoneX",
    ogDescription: "Solve ax² + bx + c = 0 for real or complex roots, discriminant, and vertex form.",
    schemaName: "Quadratic Equation Solver",
    schemaDescription: "Solve a quadratic equation for its roots, discriminant, and vertex form.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does a negative discriminant mean?", answer: "A negative discriminant means the equation has no real roots — the parabola never crosses the x-axis. Instead, it has two complex conjugate roots of the form p ± qi, where i is the imaginary unit (√−1)." }, { question: "What is vertex form and why does it matter?", answer: "Vertex form rewrites the equation as a(x − h)² + k, where (h, k) is the vertex — the parabola's highest or lowest point. It's useful for quickly reading off the maximum or minimum value of the expression without solving for the roots." }, { question: "What if I enter a = 0?", answer: "With a = 0 the equation is no longer quadratic — it becomes linear (bx + c = 0) — so this calculator requires a non-zero value for a to solve it as a proper quadratic equation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
