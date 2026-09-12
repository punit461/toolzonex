import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/renewal-expiry-tracker",
    navName: "Renewal & Expiry Tracker",
    navDescription: "Subscriptions, warranties, documents, passwords, licenses & domains.",
    name: "Renewal & Expiry Tracker",
    description: "Track expiry or renewal dates for Subscriptions, Warranties, Documents, Passwords, Licenses, or Domains, sorted by days remaining with items expiring within 30 days flagged.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HourglassBottomIcon fontSize="large" color="primary"/>,
    seoTitle: "Renewal & Expiry Tracker - Subscriptions, Warranties & More",
    seoDescription: "Free renewal and expiry tracker for subscriptions, warranties, documents, passwords, licenses, and domains, sorted by days remaining with 30-day warnings.",
    keywords: ["renewal tracker", "expiry date tracker", "subscription tracker", "warranty expiry tracker", "domain renewal reminder"],
    ogTitle: "Renewal & Expiry Tracker - Subscriptions, Warranties & More | ToolZoneX",
    ogDescription: "Track expiry and renewal dates across six categories, sorted by days remaining.",
    schemaName: "Renewal & Expiry Tracker",
    schemaDescription: "Track expiry or renewal dates for Subscriptions, Warranties, Documents, Passwords, Licenses, or Domains, sorted by days remaining with items expiring within 30 days flagged.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this send me an actual notification or alert when something expires?", answer: "No — this is a reference and planning list only. As a static site with no backend, it can't send real notifications. Once you see an upcoming date here, set a reminder in your phone's calendar or reminders app for the actual alert." }, { question: "What counts as \"expiring soon\"?", answer: "Any item with 30 or fewer days remaining is shown with an orange warning chip so it's easy to spot at a glance in the sorted list." }, { question: "Is my tracked list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
