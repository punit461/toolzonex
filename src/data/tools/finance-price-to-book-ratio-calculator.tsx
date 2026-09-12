import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/price-to-book-ratio-calculator",
    navName: "Price to Book (P/B) Ratio Calculator",
    navDescription: "P/B ratio from share price and book value.",
    name: "Price to Book (P/B) Ratio Calculator",
    description: "Calculate the price-to-book ratio from share price and book value per share, derived from shareholder equity and shares outstanding.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Price to Book Ratio Calculator - P/B Ratio Calculator",
    seoDescription: "Free price to book (P/B) ratio calculator. Enter share price and shareholder equity or book value per share to calculate P/B ratio.",
    keywords: ["price to book ratio calculator", "p/b ratio calculator", "book value per share calculator", "price book value calculator", "pb ratio calculator stocks"],
    ogTitle: "Price to Book Ratio Calculator - P/B Ratio Calculator | ToolZoneX",
    ogDescription: "Calculate the price-to-book ratio from share price and book value per share.",
    schemaName: "Price to Book (P/B) Ratio Calculator",
    schemaDescription: "Calculate P/B ratio as share price divided by book value per share, with book value per share derivable from shareholder equity divided by shares outstanding.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What does a P/B ratio below 1 mean?", answer: "It suggests the stock trades for less than the accounting value of its net assets, which some value investors see as a potential bargain — though it can also signal the market expects continued losses or asset write-downs." }, { question: "Is a high P/B ratio always bad?", answer: "Not necessarily. Companies with strong intangible assets, brand value, or high-growth prospects — like many technology or software companies — often trade at a high P/B ratio because book value doesn't capture their true earning power." }, { question: "Which industries is P/B most useful for?", answer: "It's most meaningful for asset-heavy, capital-intensive businesses such as banks, insurers, and real estate companies, where book value closely tracks tangible net worth. It's less useful for service or tech companies with few physical assets." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
