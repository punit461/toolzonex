import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/invisible-text-generator",
    navName: "Invisible Text Generator",
    navDescription: "Generate invisible and zero-width text.",
    name: "Invisible Text Generator",
    description: "Generate invisible text using zero-width and Unicode space characters, with character counts and hex codes.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoAwesomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Invisible Text Generator - Zero-Width & Invisible Unicode",
    seoDescription: "Free invisible text generator. Create invisible text using zero-width space, zero-width joiner, and other Unicode space characters, with character counts and hex codes.",
    keywords: ["invisible text generator", "zero width space", "invisible character", "zero width joiner", "invisible text", "invisible space copy paste", "zero width space generator", "invisible unicode character"],
    ogTitle: "Invisible Text Generator - Zero-Width Unicode | ToolZoneX",
    ogDescription: "Generate invisible text using zero-width and Unicode space characters, with character counts and hex codes.",
    schemaName: "Invisible Text Generator",
    schemaDescription: "Generate invisible text using zero-width and Unicode space characters.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Are invisible characters safe to use?", answer: "Yes for legitimate purposes like testing and design. However, using invisible text to manipulate search rankings or hide spam content violates most platforms' terms of service." }, { question: "What is a zero-width space?", answer: "A zero-width space (U+200B) is a Unicode character that takes up no horizontal space. It tells the text engine it's allowed to break a line at that point without adding visible space." }, { question: "How do I detect invisible text?", answer: "Paste the text into a hex editor or use JavaScript's charCodeAt() to reveal hidden characters. Most text editors also show formatting marks when enabled." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
