import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/zalgo-text-generator",
    navName: "Zalgo Text Generator",
    navDescription: "Generate corrupted/glitch Unicode text.",
    name: "Zalgo Text Generator",
    description: "Turn any text into corrupted 'glitch' text using stacked combining Unicode diacritical marks, with an adjustable intensity slider.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FormatColorTextIcon fontSize="large" color="primary"/>,
    seoTitle: "Zalgo Text Generator - Free Corrupted/Glitch Text Maker",
    seoDescription: "Turn any text into corrupted 'Zalgo' glitch text using combining Unicode diacritical marks. Adjustable intensity, copy the result. Free online tool.",
    keywords: ["zalgo text generator", "glitch text generator", "corrupted text generator", "zalgo font generator", "cursed text generator"],
    ogTitle: "Zalgo Text Generator - Free Corrupted/Glitch Text Maker | ToolZoneX",
    ogDescription: "Turn any text into corrupted 'Zalgo' glitch text instantly.",
    schemaName: "Zalgo Text Generator",
    schemaDescription: "Turn any text into corrupted 'glitch' text using stacked combining Unicode diacritical marks, with an adjustable intensity slider.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Is this a real font or an image?", answer: "Neither — it's real, plain Unicode text built by layering combining diacritical marks (a standard part of the Unicode character set) onto each ordinary letter. Since it's genuine text, not an image, you can copy and paste it anywhere that accepts Unicode text, like chat apps, social media bios, or documents." }, { question: "Why does it look different on different devices?", answer: "Very high intensity stacks dozens of combining marks per character, and different fonts and platforms render large stacks of combining marks slightly differently — some may truncate, reflow, or clip the stack. Lower intensities render far more consistently across platforms." }, { question: "Will Zalgo text break the platform I paste it into?", answer: "It shouldn't break anything, but very high-intensity text can look messy, take up unusual vertical space, or get truncated by character limits or content filters on some platforms, since each visual character is actually many Unicode code points combined together." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
