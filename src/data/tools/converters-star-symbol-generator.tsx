import StarIcon from '@mui/icons-material/Star';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/star-symbol-generator",
    navName: "Star Symbol Generator",
    navDescription: "Browse star symbols and build star ratings.",
    name: "Star Symbol Generator - Copy Star Symbols & Build Ratings",
    description: "Browse a curated set of star symbol variants and build a star rating string from a number 1-5, with optional half-star support.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <StarIcon fontSize="large" color="primary"/>,
    seoTitle: "Star Symbol Generator - Copy Star Symbols & Build Ratings",
    seoDescription: "Free online star symbol generator. Browse and copy star symbol variants, plus build a star rating string like ★★★☆☆ from any number 1-5.",
    keywords: ["star symbol generator", "star rating generator", "copy paste star symbol", "star symbol picker", "star rating text"],
    ogTitle: "Star Symbol Generator - Copy Star Symbols & Build Ratings | ToolZoneX",
    ogDescription: "Browse and copy star symbol variants, plus build a star rating string from any number 1-5.",
    schemaName: "Star Symbol Generator",
    schemaDescription: "Browse a curated set of star symbol variants and build a star rating string from a number 1-5, with optional half-star support.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Symbol Picker?", answer: "The Symbol Picker's categories cover Legal, Math, Punctuation, Arrows, Greek letters, and Fractions — none of which include star symbols. This tool fills that gap with a dedicated star collection, plus a practical rating builder the Symbol Picker doesn't offer." }, { question: "Does the half-star character display the same everywhere?", answer: "Not always — the half-star glyph's exact appearance depends on the font and platform rendering it, though most modern systems display it as a clearly partial star." }, { question: "What happens if I enter a rating that isn't a multiple of 0.5?", answer: "The rating is rounded to the nearest half-star before building the string, since the output can only represent full and half stars." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
