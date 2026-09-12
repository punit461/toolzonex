import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/username-cleaner",
    navName: "Username Cleaner",
    navDescription: "Sanitize a username to fit platform rules.",
    name: "Username Cleaner - Sanitize Your Username",
    description: "Clean and sanitize a username (or list of usernames) by stripping spaces, restricting to an allowed character set, enforcing a max length, and optionally lowercasing everything.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CleaningServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Username Cleaner - Sanitize a Username to Fit Platform Rules",
    seoDescription: "Free online username cleaner. Strip spaces, restrict characters, enforce a max length, and lowercase a username to fit common platform formatting rules.",
    keywords: ["username cleaner", "sanitize username", "clean username online", "username formatter", "fix username characters"],
    ogTitle: "Username Cleaner - Sanitize a Username to Fit Platform Rules | ToolZoneX",
    ogDescription: "Clean and sanitize a username by stripping spaces, restricting characters, and enforcing a max length.",
    schemaName: "Username Cleaner",
    schemaDescription: "Clean and sanitize a username (or list of usernames) by stripping spaces, restricting to an allowed character set, enforcing a max length, and optionally lowercasing everything.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Username Generator or Random Username Generator?", answer: "Those two tools CREATE a brand-new username for you — one builds suggestions from a keyword, the other generates a fully random one. This Username Cleaner does the opposite job: it takes a username you already have in mind and sanitizes it to fit common platform formatting rules, without inventing anything new." }, { question: "Why would a character get removed?", answer: "Most platforms only allow letters, numbers, and a small set of punctuation like underscore, period, or hyphen. Any other character — spaces, emoji, accented letters, symbols — is stripped out because it would likely be rejected by a signup form." }, { question: "Does it check if the username is actually available?", answer: "No — this tool only reformats the text you provide; it doesn't check any platform to see whether that username is already taken." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
