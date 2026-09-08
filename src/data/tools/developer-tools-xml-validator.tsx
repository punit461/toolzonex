import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/xml-validator",
    navName: "XML Validator",
    navDescription: "Validate XML code and check for errors.",
    name: "XML Validator - Validate XML Code Online",
    description: "Validate XML code and check for well-formedness errors. Shows error messages with line numbers. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "XML Validator - Validate XML Code Online",
    seoDescription: "Free online XML validator to check XML code for well-formedness errors. Shows error messages with line numbers. Client-side only.",
    keywords: ["xml validator", "validate xml", "xml checker", "xml syntax checker"],
    ogTitle: "XML Validator - Validate XML Code Online | ToolZoneX",
    ogDescription: "Validate XML code and check for well-formedness errors. Shows error messages with line numbers. Free online tool.",
    schemaName: "XML Validator",
    schemaDescription: "Validate XML code and check for well-formedness errors.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
