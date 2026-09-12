import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/extract-hashtags",
    navName: "Extract Hashtags",
    navDescription: "Pull every hashtag out of a block of text.",
    name: "Extract Hashtags",
    description: "Extract every hashtag from a block of text and see a total count, ready to copy.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Extract Hashtags from Text Online - Free Tool",
    seoDescription: "Extract every hashtag from a block of text and see a total count, ready to copy. Free online hashtag extractor.",
    keywords: ["extract hashtags", "hashtag extractor", "find hashtags in text", "pull hashtags from post", "hashtag finder tool"],
    ogTitle: "Extract Hashtags from Text Online - Free Tool | ToolZoneX",
    ogDescription: "Extract every hashtag from a block of text and see a total count, ready to copy.",
    schemaName: "Extract Hashtags",
    schemaDescription: "Extract every hashtag from a block of text and see a total count, ready to copy.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Hashtag Generator?", answer: "The Hashtag Generator SUGGESTS brand-new hashtags for a topic you type in. This tool does the opposite — it PULLS OUT hashtags that already exist within a piece of text you paste in, without inventing anything new." }, { question: "What counts as a valid hashtag here?", answer: "A # symbol immediately followed by one or more letters, numbers, or underscores, with no space — matching how hashtags are recognized on most social platforms." }, { question: "Does it remove duplicate hashtags?", answer: "No — every occurrence is listed and counted individually, so if a hashtag appears three times in your text, it shows up three times in the results." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
