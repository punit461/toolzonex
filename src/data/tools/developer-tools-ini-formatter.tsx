import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/ini-formatter",
    navName: "INI Formatter",
    navDescription: "Normalize spacing and layout of INI config text.",
    name: "INI Formatter",
    description: "Parse and reformat INI config text with normalized spacing, one blank line between sections, and preserved comments.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "INI Formatter - Normalize & Clean Up INI Config Files",
    seoDescription: "Free INI formatter. Paste raw INI config text to normalize spacing and section formatting while preserving comments and blank lines.",
    keywords: ["ini formatter", "ini file formatter", "format ini online", "ini config formatter", "ini beautifier"],
    ogTitle: "INI Formatter - Normalize & Clean Up INI Config Files | ToolZoneX",
    ogDescription: "Normalize spacing and formatting of INI config text.",
    schemaName: "INI Formatter",
    schemaDescription: "Parse and reformat INI config text with normalized spacing, section separation, and preserved comments and blank lines.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What happens if my INI file has a syntax error?", answer: "The formatter flags any line that isn't a valid comment, blank line, section header, or key=value pair with a warning message that includes the line number, rather than crashing or silently dropping content — the rest of the valid file is still formatted normally." }, { question: "Does this tool preserve comments and blank lines?", answer: "Yes — comments (starting with ; or #) and blank lines are kept in their original position in the output, they're just not reformatted since they aren't key=value pairs or sections." }, { question: "Does it support both semicolon and hash comment styles?", answer: "Yes — both ; and # are recognized as comment markers, since different INI-parsing tools and languages use different conventions." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
