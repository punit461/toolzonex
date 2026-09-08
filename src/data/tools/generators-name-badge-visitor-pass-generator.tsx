import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/name-badge-visitor-pass-generator",
    navName: "Name Badge/Visitor Pass Generator",
    navDescription: "Printable name badges or front-desk visitor passes.",
    name: "Name Badge/Visitor Pass Generator - Printable Badges",
    description: "Choose Name Badge or Visitor Pass mode and generate a formatted, printable badge with the fields appropriate to each type.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Name Badge/Visitor Pass Generator - Printable Badges",
    seoDescription: "Free name badge and visitor pass generator. Create a printable conference name badge or a front-desk visitor pass.",
    keywords: ["name badge generator", "visitor pass generator", "printable name badge maker", "conference badge template", "front desk visitor pass"],
    ogTitle: "Name Badge/Visitor Pass Generator - Printable Badges | ToolZoneX",
    ogDescription: "Create a printable name badge or a front-desk visitor pass.",
    schemaName: "Name Badge/Visitor Pass Generator",
    schemaDescription: "Choose Name Badge or Visitor Pass mode and generate a formatted, printable badge with the fields appropriate to each type.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What's the difference between a Name Badge and a Visitor Pass here?", answer: "A Name Badge is meant for someone who belongs to an organization (name, title, company), while a Visitor Pass is meant for an outside guest and includes who they're visiting, the date, and the purpose of their visit — different fields suited to each use case." }, { question: "Can I print multiple badges at once?", answer: "This tool generates one badge or pass preview at a time — for bulk printing, fill in and print each one individually, or use your browser's print function on each generated preview." }, { question: "Is the information I enter saved anywhere?", answer: "No — everything is generated live in your browser only and isn't stored, so print or screenshot the badge before navigating away." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
