import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/password-mask-generator",
    navName: "Password Mask Generator",
    navDescription: "Show only the first/last characters of a password.",
    name: "Password Mask Generator - Reveal Partial Characters Only",
    description: "Mask a password or sensitive string, showing only a configurable number of characters at the start and end, with the middle replaced by asterisks.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "Password Mask Generator - Reveal Partial Characters Only",
    seoDescription: "Free password mask generator. Show only the first and last characters of a password with the middle masked, plus the total length.",
    keywords: ["password mask generator", "mask password characters", "partial password reveal", "password masking tool", "hide middle of password"],
    ogTitle: "Password Mask Generator - Reveal Partial Characters Only | ToolZoneX",
    ogDescription: "Mask a password, showing only the first and last characters you choose.",
    schemaName: "Password Mask Generator",
    schemaDescription: "Mask a password or sensitive string, showing only a configurable number of characters at the start and end, with the middle replaced by asterisks.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Password Hint Generator?", answer: "The Password Hint Generator describes a password's structure in words (like \"starts with an uppercase letter, contains numbers and symbols\") without showing any actual characters. This Password Mask Generator instead shows an actual partially-masked version of the string itself — real characters at the start and end, with the middle blanked out — rather than a structural description." }, { question: "What happens if I reveal more characters than the password's length?", answer: "If the start and end reveal counts together cover the entire string, the tool simply shows the full string, since there's no middle portion left to mask." }, { question: "Is the string I type ever saved or transmitted?", answer: "No — everything is processed with client-side JavaScript directly in your browser, and nothing is ever saved, logged, or sent to any server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
