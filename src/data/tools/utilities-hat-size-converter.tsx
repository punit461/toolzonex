import CheckroomIcon from '@mui/icons-material/Checkroom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/hat-size-converter",
    navName: "Hat Size Converter",
    navDescription: "US, UK & international hat sizes.",
    name: "Hat Size Converter",
    description: "Convert head circumference into US hat size, UK hat size, and international letter size (XS-XXL) all at once.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CheckroomIcon fontSize="large" color="primary"/>,
    seoTitle: "Hat Size Converter - US, UK & International Sizes",
    seoDescription: "Free hat size converter. Enter your head circumference in cm or inches to get your US hat size, UK hat size, and international letter size instantly.",
    keywords: ["hat size converter", "hat size chart", "hat size calculator", "head circumference to hat size", "international hat size converter"],
    ogTitle: "Hat Size Converter - US, UK & International Sizes | ToolZoneX",
    ogDescription: "Convert head circumference into US, UK, and international hat sizes.",
    schemaName: "Hat Size Converter",
    schemaDescription: "Convert head circumference into US hat size, UK hat size, and international letter size (XS-XXL) all at once.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How do I measure my head circumference accurately?", answer: "Wrap a soft measuring tape around your head about 1–2cm above your eyebrows and ears, at the widest point, keeping the tape snug but not tight." }, { question: "Are US and UK hat sizes really the same number?", answer: "In practical terms, yes — both traditionally use the same inches-based sizing scale (like 7, 7⅛, 7¼), so a given head circumference produces the same numeric size in each system. What differs more is letter-size bands used by different international brands." }, { question: "Why do letter sizes sometimes not match my numeric size exactly?", answer: "Letter-size bands (XS–XXL) are approximate ranges set by each hat maker, so borderline measurements can round differently between brands. Use the numeric size for the most precise fit when available." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
