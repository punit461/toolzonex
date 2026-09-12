import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/duty-roster-shift-schedule-generator",
    navName: "Duty Roster/Shift Schedule Generator",
    navDescription: "Assign people to shifts, with round-robin auto-fill.",
    name: "Duty Roster/Shift Schedule Generator - Assign Staff to Shifts",
    description: "Add staff names and shifts, then assign one or more people to each shift manually or with a round-robin auto-fill shortcut to build a roster grid.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Duty Roster/Shift Schedule Generator - Assign Staff to Shifts",
    seoDescription: "Free duty roster and shift schedule generator. Assign staff to shifts manually or with round-robin auto-fill to build a roster grid.",
    keywords: ["duty roster generator", "shift schedule generator", "staff schedule maker", "work roster generator", "shift assignment tool"],
    ogTitle: "Duty Roster/Shift Schedule Generator - Assign Staff to Shifts | ToolZoneX",
    ogDescription: "Assign staff to shifts manually or with round-robin auto-fill.",
    schemaName: "Duty Roster/Shift Schedule Generator",
    schemaDescription: "Add staff names and shifts, then assign one or more people to each shift manually or with a round-robin auto-fill shortcut to build a roster grid.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I assign more than one person to a shift?", answer: "Yes — the shift assignment dropdown allows multiple selections, so you can assign as many people as needed to cover a single shift." }, { question: "What does Round-Robin Auto-Fill actually do?", answer: "It cycles through your list of people in order and assigns one person to each shift, wrapping back to the start of the list once it runs out of people — it's meant as a fast starting point you can then adjust manually." }, { question: "Does removing a person also remove them from shifts?", answer: "Yes — removing someone from the People list automatically removes them from any shifts they were assigned to, so the roster never references someone who's no longer in the list." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
