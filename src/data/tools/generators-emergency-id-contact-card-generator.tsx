import ContactsIcon from '@mui/icons-material/Contacts';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/emergency-id-contact-card-generator",
    navName: "Emergency/ID Contact Card Generator",
    navDescription: "Printable ICE card with medical & contact info.",
    name: "Emergency/ID Contact Card Generator - Printable ICE Card",
    description: "Build a printable, wallet-sized \"In Case of Emergency\" card with personal medical details and a list of emergency contacts.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ContactsIcon fontSize="large" color="primary"/>,
    seoTitle: "Emergency/ID Contact Card Generator - Printable ICE Card",
    seoDescription: "Free ICE card generator. Build a printable emergency contact card with personal medical info and emergency contacts.",
    keywords: ["emergency contact card generator", "ice contact card generator", "personal information card generator", "in case of emergency card", "printable id card maker"],
    ogTitle: "Emergency/ID Contact Card Generator - Printable ICE Card | ToolZoneX",
    ogDescription: "Build a printable emergency contact card with medical info and emergency contacts.",
    schemaName: "Emergency/ID Contact Card Generator",
    schemaDescription: "Build a printable, wallet-sized \"In Case of Emergency\" card with personal medical details and a list of emergency contacts.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is my personal and medical information saved anywhere?", answer: "No — everything you type stays in your browser only for the current session and is never saved to a server or database. It resets when you reload the page, so copy or print your card before closing the tab." }, { question: "Can I add more than one emergency contact?", answer: "Yes — use the \"Add Contact\" button to add as many emergency contacts as you need, each with their own name, relationship, and phone number." }, { question: "Should I carry a physical copy of this card?", answer: "Yes, that's the intended use — copy the text or print the card and keep it somewhere accessible, like a wallet or phone case, so first responders or others can find it quickly in an emergency." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
