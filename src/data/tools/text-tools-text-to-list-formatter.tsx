import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-to-list-formatter",
    navName: "Text to List Formatter",
    navDescription: "Turn lines of text into a bulleted or numbered list.",
    name: "Text to List Formatter - Bullet, Numbered & Lettered Lists",
    description: "Format one-item-per-line text as a Bullet, Dash, Numbered, Lettered, Markdown Bullet, or Markdown Numbered list.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Text to List Formatter - Bullet, Numbered & Lettered Lists",
    seoDescription: "Free online text to list formatter. Turn plain text into a bullet list, numbered list, lettered list, or Markdown list instantly.",
    keywords: ["text to list formatter", "bullet list generator", "numbered list generator", "markdown list generator", "lettered list generator"],
    ogTitle: "Text to List Formatter - Bullet, Numbered & Lettered Lists | ToolZoneX",
    ogDescription: "Turn plain text into a bullet, numbered, lettered, or Markdown list instantly.",
    schemaName: "Text to List Formatter",
    schemaDescription: "Format one-item-per-line text as a Bullet, Dash, Numbered, Lettered, Markdown Bullet, or Markdown Numbered list.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What is the difference between Dash and Markdown Bullet?", answer: "Both use the same \"- \" marker, but they're offered as separate style options since \"dash list\" and \"markdown bullet list\" are two common ways people search for the same result." }, { question: "What happens after \"z\" in Lettered style?", answer: "The sequence continues with double letters — aa, ab, ac, and so on — the same way spreadsheet columns continue past Z, so lists longer than 26 items still get a unique marker." }, { question: "Are blank lines included in the output?", answer: "No — empty lines in your input are skipped, so the numbering or lettering stays continuous across only the actual list items." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
