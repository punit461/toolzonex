import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/copy-paper-requirement-calculator",
    navName: "Copy Paper Requirement Calculator",
    navDescription: "Reams & cases needed from print volume.",
    name: "Copy Paper Requirement Calculator",
    description: "Calculate reams and cases of copy paper needed from pages printed per period, with a double-sided printing toggle.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "Copy Paper Requirement Calculator - Reams & Cases Needed",
    seoDescription: "Free copy paper requirement calculator. Enter pages printed per period to calculate reams and cases of paper needed.",
    keywords: ["copy paper requirement calculator", "how much paper do i need", "reams of paper calculator", "office paper usage calculator", "paper requirement calculator"],
    ogTitle: "Copy Paper Requirement Calculator - Reams & Cases Needed | ToolZoneX",
    ogDescription: "Calculate reams and cases of copy paper needed from pages printed per period.",
    schemaName: "Copy Paper Requirement Calculator",
    schemaDescription: "Calculate sheets needed from pages printed (halved if double-sided), then reams needed and cases needed by rounding up against sheets per ream and reams per case.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this account for printer jams or wasted sheets?", answer: "No — this calculates the theoretical minimum sheets needed based on page count alone. In practice, ordering a small buffer above the calculated amount is a good idea to cover misprints, jams, and test pages." }, { question: "Why round reams and cases up instead of down?", answer: "Paper is normally only sold in whole reams and whole cases, so rounding up (using the ceiling of the division) ensures you order enough to cover your actual printing needs rather than falling slightly short." }, { question: "Does double-sided printing always exactly halve sheet count?", answer: "For an even number of pages, yes — two pages print on one sheet. For an odd number of pages, the final sheet only has one side printed, but the difference is negligible at any meaningful print volume." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
