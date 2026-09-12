import HandshakeIcon from '@mui/icons-material/Handshake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/volunteer-list-generator",
    navName: "Volunteer List Generator",
    navDescription: "Organize volunteers, grouped by role or shift.",
    name: "Volunteer List Generator - Group by Role or Shift",
    description: "Add volunteers with their role, shift, and contact info, then group the resulting list by role or by shift date/time.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HandshakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Volunteer List Generator - Group by Role or Shift",
    seoDescription: "Free volunteer list generator. Organize volunteers with role, shift, and contact info, grouped by role or shift date/time.",
    keywords: ["volunteer list generator", "volunteer schedule organizer", "volunteer roster maker", "volunteer sign up list", "event volunteer list"],
    ogTitle: "Volunteer List Generator - Group by Role or Shift | ToolZoneX",
    ogDescription: "Organize volunteers with role, shift, and contact info, grouped by role or shift.",
    schemaName: "Volunteer List Generator",
    schemaDescription: "Add volunteers with their role, shift, and contact info, then group the resulting list by role or by shift date/time.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What happens if I leave the role or shift field blank?", answer: "When grouping by that field, volunteers with a blank value are grouped together under an \"Unassigned\" heading, so nobody gets silently dropped from the list." }, { question: "Can I group by both role and shift at the same time?", answer: "No — you can group by one field at a time (role or shift, or no grouping at all), which keeps the output simple and easy to scan." }, { question: "Is my volunteer list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
