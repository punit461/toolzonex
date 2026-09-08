import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/name-initials-generator",
    navName: "Name Initials Generator",
    navDescription: "Generate initials and avatar letters from a name.",
    name: "Name Initials Generator",
    description: "Generate full initials and a 2-letter avatar-style version from any full name, with a live circular avatar preview.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Name Initials Generator - Get Initials & Avatar Letters",
    seoDescription: "Generate full initials and a 2-letter avatar-style version from any full name. Free online initials generator with avatar preview.",
    keywords: ["name initials generator", "initials generator", "monogram generator", "avatar initials", "get initials from name"],
    ogTitle: "Name Initials Generator - Get Initials & Avatar Letters | ToolZoneX",
    ogDescription: "Generate full initials and a 2-letter avatar-style version from any full name.",
    schemaName: "Name Initials Generator",
    schemaDescription: "Generate full initials and a 2-letter avatar-style version from any full name, with a live circular avatar preview.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What happens with a single-word name?", answer: "If only one word is entered, both the full initials and the avatar initials show just that word's first letter." }, { question: "How are middle names handled in the avatar version?", answer: "The 2-letter avatar version only ever uses the first and last words in the name, ignoring any middle names — matching how most apps generate avatar initials." }, { question: "Does the avatar color mean anything?", answer: "The background color is generated deterministically from the name itself, so the same name always produces the same color, similar to how many apps assign consistent avatar colors per user." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
