import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/countdown-list-generator",
    navName: "Countdown List Generator",
    navDescription: "Build a milestone checklist counting down to an event.",
    name: "Countdown List Generator - Event Milestone Checklist",
    description: "Enter an event name and target date to see days, weeks, and months remaining, plus an auto-generated milestone checklist (6 months, 3 months, 1 month, 2 weeks, 1 week, 1 day before) with editable task labels.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HourglassBottomIcon fontSize="large" color="primary"/>,
    seoTitle: "Countdown List Generator - Event Milestone Checklist",
    seoDescription: "Free online countdown list generator. Enter your event date to see a days/weeks/months countdown plus an auto-generated, editable milestone planning checklist.",
    keywords: ["countdown list generator", "event countdown checklist", "milestone checklist generator", "countdown to event calculator", "event planning timeline generator"],
    ogTitle: "Countdown List Generator - Event Milestone Checklist | ToolZoneX",
    ogDescription: "Enter your event date to see a countdown plus an auto-generated, editable milestone planning checklist.",
    schemaName: "Countdown List Generator",
    schemaDescription: "Enter an event name and target date to see days, weeks, and months remaining, plus an auto-generated milestone checklist with editable task labels.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I change the milestone task labels?", answer: "Yes — every milestone has an editable text field with a generic default label like \"Final preparations\" that you can rename to anything specific to your event." }, { question: "How does the tool know which milestones are already past?", answer: "It compares each milestone's calculated date against today's date on your device, marking anything before today as Past and everything else as Upcoming." }, { question: "Does it work for dates that have already happened?", answer: "Yes — if you enter a target date in the past, the tool shows how many days ago it occurred instead of a countdown, and all milestones display as Past." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
