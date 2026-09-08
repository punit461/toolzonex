import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/project-cost-calculator",
    navName: "Project Cost Calculator",
    navDescription: "Itemized project budget with contingency.",
    name: "Project Cost Calculator",
    description: "Build a project budget from itemized cost line items plus a contingency percentage to get your total estimated project cost.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Project Cost Calculator - Budget With Contingency",
    seoDescription: "Free project cost calculator. List cost line items (labor, materials, equipment) and add a contingency percentage to get your total project budget.",
    keywords: ["project cost calculator", "project budget calculator", "construction cost calculator", "contingency calculator", "project estimate calculator"],
    ogTitle: "Project Cost Calculator - Budget With Contingency | ToolZoneX",
    ogDescription: "Build a project budget from itemized costs plus a contingency percentage.",
    schemaName: "Project Cost Calculator",
    schemaDescription: "Calculate total project budget from itemized cost line items and a contingency percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What contingency percentage should I use?", answer: "It varies by project type and risk level — well-defined projects with few unknowns often use 5-10%, while projects with significant uncertainty (new construction, unfamiliar scope) commonly use 15-25% or more. Check industry norms for your specific type of project." }, { question: "Should contingency be spent unless something goes wrong?", answer: "Generally no — contingency is meant as a reserve for unforeseen costs, not a budget to spend by default. Many project managers track contingency separately and only draw from it when an actual overrun or change occurs." }, { question: "Can I use this for any type of project?", answer: "Yes — the line items are fully editable, so you can label and total costs for construction, software, events, marketing campaigns, or any other project with a mix of cost categories." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
