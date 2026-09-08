import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/event-guest-list-generator",
    navName: "Event Guest List Generator",
    navDescription: "Track RSVPs, plus-ones, and total expected headcount.",
    name: "Event Guest List Generator - RSVP and Headcount Tracker",
    description: "Add guests with RSVP status, plus-ones, and dietary notes, and get a summary of confirmed, declined, pending, and total expected headcount.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Event Guest List Generator - RSVP and Headcount Tracker",
    seoDescription: "Free online event guest list generator. Track RSVPs, plus-ones, and dietary notes, with an automatic confirmed/declined/pending headcount summary.",
    keywords: ["event guest list generator", "rsvp tracker online", "wedding guest list maker", "party guest list organizer", "guest headcount calculator"],
    ogTitle: "Event Guest List Generator - RSVP and Headcount Tracker | ToolZoneX",
    ogDescription: "Track RSVPs, plus-ones, and dietary notes with an automatic headcount summary.",
    schemaName: "Event Guest List Generator",
    schemaDescription: "Add guests with RSVP status, plus-ones, and dietary notes, and get a summary of confirmed, declined, pending, and total expected headcount.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is Total Headcount calculated?", answer: "It adds up every guest whose RSVP is Yes, plus the number of plus-ones each of those confirmed guests is bringing — guests marked No, Maybe, or Pending aren't included since they aren't confirmed attendees." }, { question: "What's the difference between Maybe and Pending?", answer: "Maybe typically means the guest responded but is unsure, while Pending means they haven't responded at all yet — both are grouped together in the summary since neither counts toward your confirmed headcount." }, { question: "Can I track plus-ones for declined or pending guests?", answer: "You can enter a number, but it won't count toward the Total Headcount unless that guest's RSVP is set to Yes, since only confirmed guests contribute to the final expected count." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
