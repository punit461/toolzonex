import MergeIcon from '@mui/icons-material/Merge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/merge-text-files",
    navName: "Merge Text Files",
    navDescription: "Combine multiple text blocks into one.",
    name: "Merge Text Files",
    description: "Combine multiple text blocks into a single document with a chosen separator: newline, blank line, or custom string.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <MergeIcon fontSize="large" color="primary"/>,
    seoTitle: "Merge Text Files Online - Combine Multiple Text Blocks",
    seoDescription: "Combine multiple text blocks into a single document with a chosen separator: newline, blank line, or custom string. Free and instant.",
    keywords: ["merge text files", "combine text files online", "merge text blocks", "join text files", "combine multiple texts"],
    ogTitle: "Merge Text Files Online - Combine Multiple Text Blocks | ToolZoneX",
    ogDescription: "Combine multiple text blocks into a single document with a chosen separator.",
    schemaName: "Merge Text Files",
    schemaDescription: "Combine multiple text blocks into a single document with a chosen separator: newline, blank line, or custom string.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How many text blocks can I merge?", answer: "There's no fixed limit — keep clicking \"Add Another Block\" to add as many sections as you need, and remove any block with its delete icon." }, { question: "Can I upload actual .txt files instead of pasting?", answer: "This tool works by pasting text directly into each block, which keeps everything running instantly in your browser without uploading any files. Open each file in a text editor, copy its contents, and paste it into a block." }, { question: "Does the order of the blocks matter?", answer: "Yes — blocks are merged in the order they appear on the page, from top to bottom, with your chosen separator inserted between each one." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
