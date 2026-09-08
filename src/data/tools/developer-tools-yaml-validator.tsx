import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/yaml-validator",
    navName: "YAML Validator",
    navDescription: "Check YAML syntax for common errors.",
    name: "YAML Validator - Check YAML Syntax Online",
    description: "Paste YAML to instantly check for syntax errors like tabs, unmatched quotes, and invalid keys. Free online YAML validator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "YAML Validator - Check YAML Syntax Online Free",
    seoDescription: "Free online YAML validator. Paste YAML to check for tabs, unmatched quotes, and invalid keys with line-level error reporting.",
    keywords: ["yaml validator", "validate yaml", "yaml syntax checker", "check yaml online", "yaml error checker"],
    ogTitle: "YAML Validator - Check YAML Syntax Online Free | ToolZoneX",
    ogDescription: "Paste YAML to instantly check for syntax errors with line-level error reporting.",
    schemaName: "YAML Validator",
    schemaDescription: "Check YAML syntax for common errors like tabs, unmatched quotes, and invalid keys.",
    applicationCategory: "DeveloperApplication",
    currency: "USD",
    faqs: [{ question: "Does this replace a full YAML parser?", answer: "No — this is a lightweight syntax checker that catches common mistakes. For full structural validation, use a dedicated YAML library." }, { question: "Why doesn't YAML allow tabs?", answer: "YAML uses indentation for structure and the spec requires spaces. Tabs are forbidden because they can display at different widths, leading to ambiguous parsing." }, { question: "Is my data uploaded?", answer: "No — all validation happens entirely in your browser. Nothing you paste is sent to any server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
