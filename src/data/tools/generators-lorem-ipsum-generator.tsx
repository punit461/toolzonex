import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/lorem-ipsum-generator",
    navName: "Lorem Ipsum",
    navDescription: "Generate dummy text.",
    name: "Lorem Ipsum Generator",
    description: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator with custom source text and HTML output.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Lorem Ipsum Generator - Dummy Text Placeholder Online",
    seoDescription: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator.",
    keywords: ["lorem ipsum", "lorem ipsum generator", "dummy text generator", "placeholder text", "generate lorem ipsum", "mockup text"],
    ogTitle: "Lorem Ipsum Generator - Dummy Text Placeholder Online | ToolZoneX",
    ogDescription: "Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator.",
    schemaName: "Lorem Ipsum Generator",
    schemaDescription: "Generate standard dummy text for UI testing, mockups, and wireframes.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why use Lorem Ipsum instead of real text?", answer: "Its neutral, non-meaningful content keeps viewers focused on layout and typography rather than reading the actual words." }, { question: "Can I generate Lorem Ipsum from my own text?", answer: "Yes. Paste any text of at least a few sentences into the Source Text field and the generator will build new sentences from that text's own vocabulary instead of the classic Latin word list — useful for placeholder copy that roughly matches your brand's tone or a specific language." }, { question: "Can I add HTML tags like headings and lists to the output?", answer: "Yes. With paragraph output selected, enable \"Add HTML elements\" and choose which tags to include — links, bold/italic text, inline code, headers, ordered and unordered lists, description lists, blockquotes, and preformatted blocks. You can preview the rendered result or copy the raw HTML source." }, { question: "Can I change the text case of the output?", answer: "Yes. The Case dropdown switches the generated text between Regular, lowercase, UPPERCASE, Title Case, and Sentence case — useful for matching a specific style guide or testing how a layout handles different capitalization." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
