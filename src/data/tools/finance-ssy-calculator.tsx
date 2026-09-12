import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ssy-calculator",
    navName: "SSY Calculator",
    navDescription: "Sukanya Samriddhi Yojana returns.",
    name: "SSY Calculator",
    description: "Calculate the maturity value of your Sukanya Samriddhi Yojana (SSY) investment for your daughter's future.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "SSY Calculator - Sukanya Samriddhi Yojana Returns",
    seoDescription: "Free SSY calculator to calculate Sukanya Samriddhi Yojana maturity amount. Plan for your daughter's education with this government scheme.",
    keywords: ["SSY calculator", "Sukanya Samriddhi Yojana", "SSY maturity", "SSY interest rate", "daughter marriage planning", "education fund", "what is ssy scheme", "how is ssy interest calculated", "ssy account benefits"],
    ogTitle: "SSY Calculator - Sukanya Samriddhi Yojana Returns | ToolZoneX",
    ogDescription: "Calculate Sukanya Samriddhi Yojana maturity amount.",
    schemaName: "SSY Calculator",
    schemaDescription: "Calculate Sukanya Samriddhi Yojana maturity value.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is the SSY scheme?", answer: "Sukanya Samriddhi Yojana (SSY) is a government-backed small savings scheme launched under the 'Beti Bachao, Beti Padhao' campaign, letting parents or guardians open a savings account for a girl child (below age 10) to build a fund for her future education and marriage expenses." }, { question: "How is SSY interest calculated?", answer: "SSY interest is calculated annually on the account's lowest balance between the 5th and last day of each month, compounded yearly, at the government-notified rate (currently 8.2% p.a.). This calculator applies that annual compounding to your yearly deposits over the 15-year deposit period and the following years until the account matures at 21 years." }, { question: "What are the benefits of an SSY account?", answer: "SSY offers a higher interest rate than most PPF and fixed deposit options, falls under the EEE (Exempt-Exempt-Exempt) tax category so deposits (up to ₹1.5L) qualify for Section 80C deduction and both interest and maturity proceeds are tax-free, and it's backed by the Government of India." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
