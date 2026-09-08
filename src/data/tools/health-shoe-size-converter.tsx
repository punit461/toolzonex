import CheckroomIcon from '@mui/icons-material/Checkroom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/shoe-size-converter",
    navName: "Shoe Size Converter",
    navDescription: "Convert shoe sizes between US, UK, EU & CM.",
    name: "Shoe Size Converter",
    description: "Convert shoe sizes between US Men's, US Women's, UK, EU, and CM foot length using a standard conversion chart.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <CheckroomIcon fontSize="large" color="primary"/>,
    seoTitle: "Shoe Size Converter - US, UK, EU & CM Sizes",
    seoDescription: "Free shoe size converter between US Men's, US Women's, UK, EU, and CM. Enter your size in any system to see it converted across all others.",
    keywords: ["shoe size converter", "shoe size chart", "us to eu shoe size", "us to uk shoe size", "shoe size conversion calculator", "mens to womens shoe size"],
    ogTitle: "Shoe Size Converter - US, UK, EU & CM | ToolZoneX",
    ogDescription: "Convert shoe sizes between US, UK, EU, and CM instantly.",
    schemaName: "Shoe Size Converter",
    schemaDescription: "Convert shoe sizes between US Men's, US Women's, UK, EU, and CM using a standard conversion chart.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Why does my converted size feel slightly off in a specific shoe?", answer: "Standard conversion charts give a reliable starting point, but individual brands and shoe styles vary in their exact last (the mold a shoe is built on), so the same converted size might fit differently between two brands. When possible, check the specific brand's own size chart for the most accurate fit." }, { question: "How is the US Women's to US Men's conversion calculated?", answer: "This chart follows the common industry convention where US Women's sizing runs about 1.5 sizes larger than the equivalent US Men's size (e.g., a Men's 9 is roughly a Women's 10.5)." }, { question: "What if my exact size isn't in the table?", answer: "The converter matches your entered size to the closest available row in the reference chart, so sizes between listed increments will show the nearest equivalent rather than an interpolated exact value." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
