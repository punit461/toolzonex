import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/wide-text-generator",
    navName: "Wide Text Generator",
    navDescription: "Convert text to full-width Unicode.",
    name: "Wide Text Generator - Full-Width Unicode Text",
    description: "Convert your text into full-width Unicode characters for a wide, spaced-out stylized text effect, with a copy button.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Wide Text Generator - Full-Width Unicode Text",
    seoDescription: "Convert your text into full-width Unicode characters for a wide, spaced-out stylized text effect. Free online tool with instant copy and paste.",
    keywords: ["wide text generator", "full width text generator", "fullwidth unicode text", "wide font generator"],
    ogTitle: "Wide Text Generator - Full-Width Unicode Text | ToolZoneX",
    ogDescription: "Convert your text into full-width Unicode characters for a wide, spaced-out stylized text effect.",
    schemaName: "Wide Text Generator",
    schemaDescription: "Convert your text into full-width Unicode characters for a wide, spaced-out stylized text effect, with a copy button.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Will this wide text work everywhere I paste it?", answer: "In most modern apps and browsers, yes, since these are standard Unicode characters. Some older systems may not render every character correctly." }, { question: "Does this work the same as the Fancy Text Generator?", answer: "Both tools remap your text to different Unicode characters, but this one focuses specifically on the full-width forms that create a wide, spaced-out look." }, { question: "Does it convert numbers and punctuation too?", answer: "Yes — letters, numbers, and most common punctuation are all converted to their full-width Unicode equivalents." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
