import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/mailto-link-generator",
    navName: "Mailto Link Generator",
    navDescription: "Create email links with subject & body.",
    name: "Mailto Link Generator",
    description: "Generate mailto links with pre-filled subject, body, CC, and BCC. Free tool for creating email links.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <AttachEmailIcon fontSize="large" color="primary"/>,
    seoTitle: "Mailto Link Generator - Create Email Links",
    seoDescription: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
    keywords: ["mailto link generator", "create email links", "mailto links", "email links", "pre-filled emails", "email template generator", "mailto generator", "email link creator", "email mailto generator", "mailto link creator", "mail to generator", "mail to link creator", "gmail link generator", "create a mailto link", "html mailto link generator"],
    ogTitle: "Mailto Link Generator - Create Email Links | ToolZoneX",
    ogDescription: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
    schemaName: "Mailto Link Generator",
    schemaDescription: "Generate mailto links with pre-filled subject, body, CC, and BCC fields. Free online mailto link generator tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this send the email automatically?", answer: "No — clicking a mailto link opens the visitor's default email app with a pre-filled draft; they still need to hit send themselves." }, { question: "Will this work as a link creator for Gmail?", answer: "This tool generates a standard mailto: link, not a Gmail-specific compose URL. If the person clicking the link has Gmail set as their device's default mail handler (or uses Gmail's browser extension for mailto links), it will open a Gmail compose window — otherwise it opens whatever email client is set as default. It isn't a dedicated Gmail link generator, but it works with Gmail wherever Gmail is the default handler." }, { question: "Do I need to fill in every field?", answer: "No — only the recipient email address is required. Subject, body, CC, and BCC are all optional; leave any of them blank and they're simply omitted from the generated link." }, { question: "Can I use this mailto link creator on my website?", answer: "Yes — paste the generated link as the href of an <a> tag (or a button) on your site. Clicking it opens the visitor's email client with the recipient, subject, and body already filled in." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
