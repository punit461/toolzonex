import GradeIcon from '@mui/icons-material/Grade';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/weighted-grade-calculator",
    navName: "Weighted Grade Calculator",
    navDescription: "Calculate your current overall grade from category weights.",
    name: "Weighted Grade Calculator - Current Overall Grade",
    description: "Calculate your current overall course grade from category grades and weights, distinct from solving for a required final exam score.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GradeIcon fontSize="large" color="primary"/>,
    seoTitle: "Weighted Grade Calculator - Current Overall Grade",
    seoDescription: "Free weighted grade calculator. Add grading categories with their grades and weights to calculate your current overall course grade.",
    keywords: ["weighted grade calculator", "overall grade calculator", "grade weight calculator", "course grade calculator", "weighted average grade calculator"],
    ogTitle: "Weighted Grade Calculator | ToolZoneX",
    ogDescription: "Calculate your current overall grade from category weights.",
    schemaName: "Weighted Grade Calculator",
    schemaDescription: "Calculate your current overall course grade from category grades and weights.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from a \"final grade calculator\"?", answer: "This tool computes your current overall grade from category grades and weights you already have. It doesn't solve for a future required score — for that (figuring out what you need on an upcoming final to hit a target grade), use our dedicated Final Grade Calculator instead." }, { question: "What if my weights don't add up to 100%?", answer: "The formula divides by the total weight you've entered, so it still produces a correct proportional average even if your weights sum to less than 100% (for categories not yet graded) or don't exactly total 100 — though it's clearest to interpret when your entered weights represent the full course." }, { question: "Can I include a category with 0% weight?", answer: "Yes — it stays in your list but contributes nothing to the overall average, since multiplying by a weight of zero zeroes out that category's effect on the result." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
