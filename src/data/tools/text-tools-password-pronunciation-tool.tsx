import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/password-pronunciation-tool",
    navName: "Password Pronunciation Tool",
    navDescription: "Spell out a password clearly for voice or phone.",
    name: "Password Pronunciation Tool",
    description: "Convert a password or string into a clear spoken breakdown using the NATO phonetic alphabet for letters, spoken digits, and named symbols.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <RecordVoiceOverIcon fontSize="large" color="primary"/>,
    seoTitle: "Password Pronunciation Tool - Spell Out a Password Clearly",
    seoDescription: "Free online password pronunciation tool. Convert a password into a clear spoken breakdown using NATO phonetic letters, digits, and symbol names.",
    keywords: ["password pronunciation tool", "how to say a password out loud", "spell password phonetically", "NATO alphabet password", "read password over the phone"],
    ogTitle: "Password Pronunciation Tool - Spell Out a Password Clearly | ToolZoneX",
    ogDescription: "Convert a password into a clear spoken breakdown for reading aloud over the phone.",
    schemaName: "Password Pronunciation Tool",
    schemaDescription: "Convert a password or string into a clear spoken breakdown using the NATO phonetic alphabet for letters, spoken digits, and named symbols.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this tool for generating or storing passwords?", answer: "No — this tool is meant purely for securely and unambiguously communicating an existing password over voice or phone. It doesn't generate new passwords or store anything you type; use a dedicated password generator and manager for those purposes." }, { question: "Why use the NATO phonetic alphabet for letters?", answer: "The NATO phonetic alphabet was specifically designed to avoid confusion between similar-sounding letters (like B and D, or M and N) over noisy audio channels, making it the clearest standard way to spell something out loud." }, { question: "Why is 9 spelled \"Niner\"?", answer: "This is the same radio convention used in aviation — \"Niner\" is used instead of \"Nine\" because \"Nine\" can sound too close to \"Five\" over the phone or radio." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
