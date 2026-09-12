import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/duplicate-file-name-checker",
    navName: "Duplicate File Name Checker",
    navDescription: "Find duplicate names in a list of file names.",
    name: "Duplicate File Name Checker",
    description: "Paste a list of file names and instantly find which ones appear more than once, with optional case-insensitive matching.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicate File Name Checker - Find Repeated File Names",
    seoDescription: "Free online duplicate file name checker. Paste a list of file names and instantly see which ones repeat, with a case-insensitive matching option.",
    keywords: ["duplicate file name checker", "find duplicate file names", "repeated file names", "file name duplicate finder", "check duplicate files"],
    ogTitle: "Duplicate File Name Checker - Find Repeated File Names | ToolZoneX",
    ogDescription: "Paste a list of file names and instantly see which ones repeat.",
    schemaName: "Duplicate File Name Checker",
    schemaDescription: "Paste a list of file names and instantly find which ones appear more than once, with optional case-insensitive matching.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it compare full paths or just file names?", answer: "It compares whatever text you paste on each line exactly — if you paste full paths, it compares full paths; if you paste just file names, it compares just the names." }, { question: "What counts as one \"duplicate group\"?", answer: "Every unique name that appears two or more times counts as one group, regardless of how many times it repeats — so a name appearing 5 times is still just 1 duplicate group, shown with a count of 5." }, { question: "Are blank lines counted?", answer: "No — empty or whitespace-only lines are ignored and never counted as duplicates of each other." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
