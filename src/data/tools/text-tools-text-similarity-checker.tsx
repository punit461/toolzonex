import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-similarity-checker",
    navName: "Text Similarity Checker",
    navDescription: "Compare two texts for word overlap.",
    name: "Text Similarity Checker",
    description: "Compare two texts and get a similarity percentage based on Jaccard similarity of their word sets.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Similarity Checker - Compare Two Texts Online",
    seoDescription: "Compare two texts and get a similarity percentage based on word overlap (Jaccard similarity). Free and instant, updates live.",
    keywords: ["text similarity checker", "compare two texts online", "text comparison tool", "jaccard similarity calculator"],
    ogTitle: "Text Similarity Checker - Compare Two Texts Online | ToolZoneX",
    ogDescription: "Compare two texts and get a similarity percentage based on word overlap.",
    schemaName: "Text Similarity Checker",
    schemaDescription: "Compare two texts and get a similarity percentage based on Jaccard similarity of their word sets.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does word order matter?", answer: "No — this method compares the sets of words used, not their order or the sentences they form. Two texts with the same words in a different order would score 100% similar." }, { question: "Does this detect plagiarism?", answer: "No — this is a simple word-overlap similarity measure, not a plagiarism detector. A high score means the two texts share a lot of vocabulary, not that one copies the other's exact phrasing or structure." }, { question: "Why is the score lower than I expected for two similar paragraphs?", answer: "Jaccard similarity divides shared words by all distinct words combined, so even paraphrased text with the same meaning but different vocabulary choices can score lower than you might intuitively expect." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
