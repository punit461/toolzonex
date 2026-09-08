import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-case-analyzer",
    navName: "Text Case Analyzer",
    navDescription: "Detect what case style text is already written in.",
    name: "Text Case Analyzer",
    description: "Detect which naming or case convention a piece of text follows, plus a full character-composition breakdown.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Case Analyzer - Detect camelCase, snake_case & More",
    seoDescription: "Detect which naming or case convention a piece of text follows, plus a full character-composition breakdown. Free online case detector.",
    keywords: ["text case analyzer", "detect case style", "identify camelcase snake_case", "case style checker", "naming convention detector"],
    ogTitle: "Text Case Analyzer - Detect camelCase, snake_case & More | ToolZoneX",
    ogDescription: "Detect which naming or case convention a piece of text follows, plus a character-composition breakdown.",
    schemaName: "Text Case Analyzer",
    schemaDescription: "Detect which naming or case convention a piece of text follows, plus a full character-composition breakdown.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Case Converter?", answer: "The Case Converter CONVERTS text between case styles on request — you tell it which style to produce. This tool does the opposite: it ANALYZES and DETECTS what case style the input text is ALREADY written in, without changing anything." }, { question: "What does \"Mixed / No clear pattern\" mean?", answer: "It means the text doesn't cleanly match any of the recognized conventions — for example, a sentence with irregular capitalization or a string that combines multiple naming styles." }, { question: "Does the detector check single words too?", answer: "Yes, though single all-lowercase or all-uppercase words are reported simply as lowercase or UPPERCASE rather than camelCase or snake_case, since those conventions require multiple words to be meaningfully identified." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
