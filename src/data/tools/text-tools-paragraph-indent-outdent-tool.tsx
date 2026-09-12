import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/paragraph-indent-outdent-tool",
    navName: "Paragraph Indent/Outdent Tool",
    navDescription: "Add or remove leading whitespace from every line.",
    name: "Paragraph Indent/Outdent Tool",
    description: "Add or remove a configurable amount of leading whitespace (spaces or tabs) from every line of text, with separate Indent and Outdent modes.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatIndentIncreaseIcon fontSize="large" color="primary"/>,
    seoTitle: "Paragraph Indent/Outdent Tool - Add or Remove Leading Whitespace",
    seoDescription: "Free online paragraph indenter and outdenter. Add or remove spaces or tabs from every line of text with a configurable width.",
    keywords: ["paragraph indent tool", "text indenter online", "text outdenter online", "add indentation to text", "remove leading whitespace"],
    ogTitle: "Paragraph Indent/Outdent Tool - Add or Remove Leading Whitespace | ToolZoneX",
    ogDescription: "Add or remove a configurable amount of leading whitespace from every line of text.",
    schemaName: "Paragraph Indent/Outdent Tool",
    schemaDescription: "Add or remove a configurable amount of leading whitespace (spaces or tabs) from every line of text, with separate Indent and Outdent modes.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What is the difference between this tool and a plain \"indenter\" or \"outdenter\"?", answer: "Nothing — this single tool covers both jobs. The mode toggle switches between adding indentation (indenting) and removing it (outdenting), so there's no need for two separate tools." }, { question: "What happens if a line has less indentation than the outdent width?", answer: "Outdent removes only as much whitespace as actually exists at the start of that line — it never removes non-whitespace characters or pushes the line into negative indentation." }, { question: "Are blank lines affected?", answer: "Indent mode skips empty lines so it doesn't add trailing whitespace-only lines; Outdent mode leaves empty lines as empty since there's no leading whitespace to remove." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
