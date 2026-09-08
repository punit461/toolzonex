import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/space-to-tab-converter",
    navName: "Space to Tab Converter",
    navDescription: "Convert leading spaces to tabs or tabs to spaces.",
    name: "Space to Tab Converter",
    description: "Convert leading spaces to tabs (or tabs back to spaces) in code or text, based on a configurable spaces-per-tab setting.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <FormatLineSpacingIcon fontSize="large" color="primary"/>,
    seoTitle: "Space to Tab Converter - Indentation Converter Online",
    seoDescription: "Convert leading spaces to tabs, or tabs back to spaces, in code or text. Free online indentation converter with a configurable spaces-per-tab setting.",
    keywords: ["space to tab converter", "tabs to spaces converter", "convert spaces to tabs", "indentation converter", "tab space converter online"],
    ogTitle: "Space to Tab Converter - Indentation Converter Online | ToolZoneX",
    ogDescription: "Convert leading spaces to tabs, or tabs back to spaces, in code or text.",
    schemaName: "Space to Tab Converter",
    schemaDescription: "Convert leading spaces to tabs (or tabs back to spaces) in code or text, based on a configurable spaces-per-tab setting.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this affect non-indentation whitespace?", answer: "No — only leading whitespace at the start of each line (indentation) is converted; spaces used elsewhere in a line, such as between words or arguments, are left untouched." }, { question: "What happens with mixed leading spaces and tabs?", answer: "The tool processes the leading whitespace left to right, converting runs of spaces to tabs (or vice versa) while preserving any existing tabs and leftover spaces that don't make a full group." }, { question: "Can I convert in both directions?", answer: "Yes — use the toggle to switch between Spaces to Tabs and Tabs to Spaces at any time using the same spaces-per-tab setting." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
