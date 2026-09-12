import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/semester-percentage-calculator",
    navName: "Semester Percentage Calculator",
    navDescription: "Aggregate marks across a full semester.",
    name: "Semester Percentage Calculator",
    description: "Calculate your overall semester percentage across multiple subjects, with a per-subject breakdown table.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Semester Percentage Calculator - Multi-Subject Percentage",
    seoDescription: "Free semester percentage calculator. Add every subject's marks to get your overall semester percentage, with a per-subject breakdown table.",
    keywords: ["semester percentage calculator", "semester marks calculator", "overall percentage calculator semester", "multi subject percentage calculator", "report card percentage calculator"],
    ogTitle: "Semester Percentage Calculator - Multi-Subject Percentage | ToolZoneX",
    ogDescription: "Calculate your overall semester percentage across all subjects.",
    schemaName: "Semester Percentage Calculator",
    schemaDescription: "Calculate overall semester percentage by aggregating marks obtained and maximum marks across multiple subjects.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from a single-subject percentage calculator?", answer: "This tool is built specifically around aggregating multiple subjects for a full semester: it tracks a name and marks for each subject, shows a per-subject percentage breakdown table alongside the combined result, and correctly weights subjects with different maximum marks rather than just averaging a single test's score." }, { question: "Does this average each subject's percentage together?", answer: "No — it sums total marks obtained and total maximum marks across all subjects first, then divides. This weights subjects by their maximum marks rather than treating every subject's percentage equally, which is the standard way semester percentages are calculated on report cards." }, { question: "Can I remove a subject I added by mistake?", answer: "Yes — click the delete icon next to any subject row to remove it from the calculation. The overall percentage and breakdown table update immediately to reflect the remaining subjects." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
