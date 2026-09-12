import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/final-grade-calculator",
    navName: "Final Grade Calculator",
    navDescription: "Score you need on your final to hit a target grade.",
    name: "Final Grade Calculator - Required Score Calculator",
    description: "Calculate the score you need on a remaining assignment or final exam to reach your desired overall grade.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Final Grade Calculator - What Do I Need on My Final?",
    seoDescription: "Free final grade calculator. Enter your current grade, the final's weight, and your target grade to find the score you need on your final exam.",
    keywords: ["final grade calculator", "what do i need on my final", "required score calculator", "grade needed on final exam", "final exam grade calculator"],
    ogTitle: "Final Grade Calculator - What Do I Need on My Final? | ToolZoneX",
    ogDescription: "Find the score you need on your final exam to hit your target grade.",
    schemaName: "Final Grade Calculator",
    schemaDescription: "Calculate the score needed on a remaining assignment or final exam to reach a desired overall grade.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does it mean if the required score is over 100%?", answer: "It means your desired overall grade isn't achievable with a normal final exam score — you'd need extra credit, or you should adjust your target to something realistically reachable." }, { question: "What if the required score is negative?", answer: "A negative required score means you've already secured your target grade even with a zero on the remaining work — your current grade alone is high enough given the final's weight." }, { question: "How do I find the weight of my final exam?", answer: "Check your course syllabus — instructors typically state each component's weight (like \"Final Exam: 30% of grade\") up front. If several items remain, add up their combined weight and treat that as one combined \"remaining work\" percentage." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
