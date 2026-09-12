import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/sequential-file-numbering-tool",
    navName: "Sequential File Numbering Tool",
    navDescription: "Generate a numbered filename list with zero-padding.",
    name: "Sequential File Numbering Tool",
    description: "Generate a sequential list of numbered filenames from a base name, starting number, file count, zero-padding width, and optional extension.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Sequential File Numbering Tool - Generate Numbered Filenames",
    seoDescription: "Free sequential file numbering tool. Generate a numbered filename list with zero-padding and an optional file extension, ready to copy.",
    keywords: ["sequential file numbering tool", "file name numbering tool", "sequential file name generator", "numbered filename generator", "zero padded filename generator"],
    ogTitle: "Sequential File Numbering Tool - Generate Numbered Filenames | ToolZoneX",
    ogDescription: "Generate a sequential, zero-padded list of numbered filenames.",
    schemaName: "Sequential File Numbering Tool",
    schemaDescription: "Generate a sequential list of numbered filenames from a base name, starting number, file count, zero-padding width, and optional extension.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool actually rename my files?", answer: "No — it only generates the list of filenames as text. Use the generated list as a reference alongside your operating system's batch rename feature or a script." }, { question: "What happens if I set the padding width too low for the last number?", answer: "Numbers that need more digits than the padding width simply print at their natural length — for example, padding width 2 with a count that reaches 100 still shows \"100\" rather than truncating it." }, { question: "Is the file extension required?", answer: "No — leave it blank to generate filenames with no extension, useful for folder names or extension-less identifiers." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
