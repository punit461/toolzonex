import GradeIcon from '@mui/icons-material/Grade';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/gpa-calculator",
    navName: "GPA Calculator",
    navDescription: "US 4.0-scale GPA from courses & letter grades.",
    name: "GPA Calculator",
    description: "Calculate your GPA on the standard US 4.0 scale from course credit hours and letter grades.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GradeIcon fontSize="large" color="primary"/>,
    seoTitle: "GPA Calculator - Calculate GPA on a 4.0 Scale",
    seoDescription: "Free GPA calculator to work out your grade point average on the standard US 4.0 scale from course credit hours and letter grades (A, A-, B+, etc).",
    keywords: ["gpa calculator", "4.0 gpa calculator", "calculate gpa", "college gpa calculator", "high school gpa calculator", "letter grade to gpa"],
    ogTitle: "GPA Calculator - Calculate GPA on a 4.0 Scale | ToolZoneX",
    ogDescription: "Work out your GPA on the standard US 4.0 scale from course credit hours and letter grades.",
    schemaName: "GPA Calculator",
    schemaDescription: "Calculate GPA on the standard US 4.0 scale from course credit hours and letter grades.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this handle plus/minus grades like A- and B+?", answer: "Yes — the calculator uses the standard plus/minus 4.0 scale (A- = 3.7, B+ = 3.3, and so on) used by most US colleges and high schools. Some institutions round or omit plus/minus grades, so double-check your school's exact scale if it differs." }, { question: "What about weighted GPA for AP or honors classes?", answer: "This calculator computes standard unweighted GPA. Weighted GPA adds extra points (commonly 0.5 or 1.0) for AP, IB, or honors courses — check your school's specific weighting policy and add those points to the grade before entering it if you need a weighted figure." }, { question: "Do pass/fail or audited courses count toward GPA?", answer: "Typically no — pass/fail and audited courses are usually excluded from GPA calculations entirely at most institutions, so leave them out of this calculator unless your school explicitly includes them." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
