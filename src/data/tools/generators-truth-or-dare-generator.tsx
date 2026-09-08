import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/truth-or-dare-generator",
    navName: "Truth or Dare Generator",
    navDescription: "Random truth questions & dares.",
    name: "Truth or Dare Generator - Mild & Spicy",
    description: "Generate random truth questions or dare challenges with a Mild or Spicy difficulty setting, kept family-friendly for a general audience.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <RecordVoiceOverIcon fontSize="large" color="primary"/>,
    seoTitle: "Truth or Dare Generator - Mild & Spicy Prompts",
    seoDescription: "Generate random truth questions or dare challenges with a Mild or Spicy setting. Free, family-friendly online tool for parties and game nights.",
    keywords: ["truth or dare generator", "random truth or dare", "truth or dare questions generator", "dare generator"],
    ogTitle: "Truth or Dare Generator - Mild & Spicy Prompts | ToolZoneX",
    ogDescription: "Generate random truth questions or dare challenges with a Mild or Spicy difficulty setting.",
    schemaName: "Truth or Dare Generator",
    schemaDescription: "Generate random truth questions or dare challenges with a Mild or Spicy difficulty setting, kept family-friendly for a general audience.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Is the content appropriate for all ages?", answer: "Both difficulty levels are written to be family-friendly and suitable for a general audience — Spicy is simply a bit bolder and more playful than Mild, not adult content." }, { question: "Can players skip a prompt they do not like?", answer: "Yes — this is just a prompt generator. It's up to your group's own house rules whether skipping is allowed." }, { question: "Can the same prompt come up more than once?", answer: "Yes — each click randomly selects from the list independently, so repeats are possible." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
