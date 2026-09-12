import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-case-mixer",
    navName: "Text Case Mixer",
    navDescription: "Random or alternating casing.",
    name: "Text Case Mixer",
    description: "Convert text into random case, alternating case, or inverse case. Free online meme text generator.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Case Mixer - Random & Alternating Case Generator",
    seoDescription: "Convert text into random case, alternating case, or inverse case. Free online mocking meme text generator.",
    keywords: ["text case mixer", "random case generator", "mocking spongebob text", "alternating case", "inverse case", "meme text generator"],
    ogTitle: "Text Case Mixer - Random & Alternating Case Generator | ToolZoneX",
    ogDescription: "Convert text into random case, alternating case, or inverse case.",
    schemaName: "Text Case Mixer",
    schemaDescription: "Convert text into random case, alternating case, or inverse case.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
