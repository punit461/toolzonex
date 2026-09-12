import DiamondIcon from '@mui/icons-material/Diamond';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ring-size-converter",
    navName: "Ring Size Converter",
    navDescription: "Convert ring sizes between US, UK, EU & mm.",
    name: "Ring Size Converter",
    description: "Convert ring sizes between US/Canada, UK/Australia, EU, and inner diameter in millimeters using a standard conversion chart.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DiamondIcon fontSize="large" color="primary"/>,
    seoTitle: "Ring Size Converter - US, UK, EU & MM Sizes",
    seoDescription: "Free ring size converter between US/Canada, UK/Australia, EU, and diameter in mm. Enter your size in any system to see it converted across all others.",
    keywords: ["ring size converter", "ring size chart", "us to uk ring size", "ring size conversion calculator", "ring size in mm"],
    ogTitle: "Ring Size Converter - US, UK, EU & MM | ToolZoneX",
    ogDescription: "Convert ring sizes between US, UK, EU, and mm instantly.",
    schemaName: "Ring Size Converter",
    schemaDescription: "Convert ring sizes between US/Canada, UK/Australia, EU, and inner diameter in millimeters using a standard conversion chart.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I measure my ring size at home?", answer: "Measure the inner diameter of a ring that already fits well (in millimeters) using a ruler, or wrap a strip of paper or string around your finger and measure its circumference, then convert. Entering the diameter directly into the \"Diameter (mm)\" option above gives the most direct conversion." }, { question: "Why does my converted size feel slightly off?", answer: "Standard conversion charts give a reliable starting point, but band width and finger shape can affect how a given size actually fits — a wider band typically fits more snugly than a thin band at the same listed size. When possible, get sized in person at a jeweler for the most accurate fit." }, { question: "What if my exact size isn't in the table?", answer: "The converter matches your entered size to the closest available row in the reference chart, so sizes between listed increments will show the nearest equivalent rather than an interpolated exact value." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
