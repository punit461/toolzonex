import ContactsIcon from '@mui/icons-material/Contacts';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/contact-list-formatter",
    navName: "Contact List Formatter",
    navDescription: "Format names, phones, emails & addresses into a clean list.",
    name: "Contact List Formatter",
    description: "Format a list of contacts — name, phone, email, and address, all optional — into a clean, consistently aligned, copyable list showing only the fields you filled in.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ContactsIcon fontSize="large" color="primary"/>,
    seoTitle: "Contact List Formatter - Clean Up Names, Phones & Addresses",
    seoDescription: "Free contact list formatter. Format names, phone numbers, emails, and addresses into a clean, consistent, copyable contact list.",
    keywords: ["contact list formatter", "address list formatter", "phone list formatter", "contact list generator", "format contact list"],
    ogTitle: "Contact List Formatter - Clean Up Names, Phones & Addresses | ToolZoneX",
    ogDescription: "Format contacts into a clean, consistently aligned, copyable list.",
    schemaName: "Contact List Formatter",
    schemaDescription: "Format a list of contacts — name, phone, email, and address, all optional — into a clean, consistently aligned, copyable list showing only the fields you filled in.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do I have to fill in every field for each contact?", answer: "No — only the name is effectively required for a contact to show up in the output. Phone, email, and address are all optional, and any left blank are simply skipped in that contact's formatted block." }, { question: "Can I use this as just a phone list or just an address list?", answer: "Yes — fill in only the phone field (or only the address field) across all your contacts, and the formatted output naturally becomes a phone-only or address-only list." }, { question: "Is my contact list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the formatted list before you close the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
