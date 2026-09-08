import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/chess-rating-calculator",
    navName: "Chess Rating Calculator",
    navDescription: "Performance rating & expected score.",
    name: "Chess Rating Calculator",
    description: "Calculate your chess performance rating from results, or work out the expected score and rating change between two Elo ratings.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Chess Rating Calculator - Performance Rating & Expected Score",
    seoDescription: "Free chess rating calculator. Estimate a performance rating from wins, draws, and losses, or compute the Elo expected score and rating change between two players.",
    keywords: ["chess rating calculator", "performance rating", "elo calculator", "expected score", "chess elo", "rating change calculator", "chess performance"],
    ogTitle: "Chess Rating Calculator - Performance Rating & Expected Score | ToolZoneX",
    ogDescription: "Calculate chess performance rating from results, or the expected score and rating change between two Elo ratings.",
    schemaName: "Chess Rating Calculator",
    schemaDescription: "Calculate chess performance rating from results, or the expected score and rating change between two Elo ratings.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a good performance rating?", answer: "It depends on your level — a performance notably above your current rating is a strong result. FIDE categories reach 2500+ for grandmasters, while club players typically sit in the 1200–2000 range." }, { question: "How is the rating change calculated?", answer: "Typically K × (actual score − expected score), where a win counts as 1, a draw as 0.5, and a loss as 0. Higher-rated players use a smaller K. This tool shows an estimate using K = 16." }, { question: "Is the performance rating formula exact?", answer: "Official performance ratings use a more rigorous method; this is a widely used, simple approximation ideal for quick self-assessment." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
