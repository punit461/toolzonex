import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/npv-irr-calculator",
    navName: "NPV & IRR Calculator",
    navDescription: "Net present value and internal rate of return.",
    name: "NPV & IRR Calculator",
    description: "Calculate Net Present Value and Internal Rate of Return from an initial investment, a discount rate, and a series of future cash flows.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "NPV & IRR Calculator - Net Present Value & Internal Rate of Return",
    seoDescription: "Free NPV and IRR calculator. Enter an initial investment, discount rate, and future cash flows to calculate Net Present Value and Internal Rate of Return.",
    keywords: ["npv calculator", "irr calculator", "net present value calculator", "internal rate of return calculator", "discounted cash flow calculator"],
    ogTitle: "NPV & IRR Calculator - Net Present Value & IRR | ToolZoneX",
    ogDescription: "Calculate Net Present Value and Internal Rate of Return from cash flows.",
    schemaName: "NPV & IRR Calculator",
    schemaDescription: "Calculate Net Present Value and Internal Rate of Return from an initial investment, a discount rate, and a series of future cash flows.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What does a negative NPV mean?", answer: "A negative NPV means the investment is expected to return less than your discount rate — in other words, the future cash flows aren't worth more than what you put in, once discounted back to today." }, { question: "Why might IRR not be calculable?", answer: "If the cash flow series never actually flips from a net negative present value to a net positive one anywhere in the −99% to 1,000% search range, there is no rate in that range where NPV crosses zero, so IRR can't be determined." }, { question: "Should I use NPV or IRR to decide between two projects?", answer: "NPV is generally considered the more reliable metric for ranking projects since it reflects total dollar value created, while IRR can sometimes be misleading when comparing projects of very different sizes or cash flow timing." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
