import StairsIcon from '@mui/icons-material/Stairs';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/diagonal-text-generator",
    navName: "Diagonal Text Generator",
    navDescription: "Turn text into a diagonal staircase effect.",
    name: "Diagonal Text Generator - Staircase Text Effect",
    description: "Render short text diagonally using a monospace character grid, with each character offset by increasing leading spaces to create a staircase visual effect.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <StairsIcon fontSize="large" color="primary"/>,
    seoTitle: "Diagonal Text Generator - Staircase Text Effect",
    seoDescription: "Free online diagonal text generator. Turn any short word or phrase into a diagonal staircase effect using plain monospace text.",
    keywords: ["diagonal text generator", "staircase text generator", "diagonal text effect", "monospace text art", "copy paste diagonal text"],
    ogTitle: "Diagonal Text Generator - Staircase Text Effect | ToolZoneX",
    ogDescription: "Turn short text into a diagonal staircase effect using plain monospace text.",
    schemaName: "Diagonal Text Generator",
    schemaDescription: "Render short text diagonally using a monospace character grid, with each character offset by increasing leading spaces to create a staircase visual effect.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Will the diagonal effect show up everywhere I paste it?", answer: "It only looks correct in places that use a monospace font and preserve leading spaces exactly, like a code block, plain text editor, or terminal. Regular chat text boxes or rich-text editors that collapse whitespace will not display it correctly." }, { question: "Why does spacing matter?", answer: "The spacing value controls how many spaces are added per step — a higher value spreads the characters further apart diagonally, creating a steeper staircase effect." }, { question: "Is there a length limit?", answer: "Input is capped at 40 characters, since very long text becomes impractical to read once spread diagonally across dozens of lines." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
