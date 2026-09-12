import AssessmentIcon from '@mui/icons-material/Assessment';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mortgage-affordability-calculator",
    navName: "Mortgage Affordability Calculator",
    navDescription: "Max mortgage using front/back-end DTI & PITI.",
    name: "Mortgage Affordability Calculator",
    description: "Estimate the maximum affordable mortgage using separate front-end and back-end DTI ratios with loan-program presets, including property tax, insurance, and HOA.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AssessmentIcon fontSize="large" color="primary"/>,
    seoTitle: "Mortgage Affordability Calculator - Front/Back-End DTI",
    seoDescription: "Free mortgage affordability calculator using front-end and back-end DTI ratios with Conventional, FHA, and VA presets, plus tax, insurance, and HOA.",
    keywords: ["mortgage affordability calculator", "front end back end ratio calculator", "dti mortgage calculator", "how much mortgage can i afford", "piti calculator"],
    ogTitle: "Mortgage Affordability Calculator - Front/Back-End DTI | ToolZoneX",
    ogDescription: "Estimate your maximum affordable mortgage using front-end and back-end DTI ratios.",
    schemaName: "Mortgage Affordability Calculator",
    schemaDescription: "Estimate the maximum affordable mortgage using front-end and back-end debt-to-income ratios, including property tax, insurance, and HOA.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why include property tax, insurance, and HOA at all?", answer: "Lenders qualify borrowers based on the full housing payment (PITI: principal, interest, taxes, insurance), not principal and interest alone. Leaving those costs out overstates how large a loan you can actually qualify for, since they eat directly into your allowed housing budget." }, { question: "Why does the VA preset have no front-end limit?", answer: "VA loans generally don't enforce a strict front-end (housing-only) ratio the way Conventional and FHA loans do — they primarily rely on a back-end (total debt) ratio, commonly around 41%, alongside residual income requirements not modeled here." }, { question: "How is this different from a general house affordability calculator?", answer: "This tool is built specifically around the mortgage-approval process: adjustable front-end and back-end ratios with loan-program presets, plus taxes, insurance, and HOA rolled into the payment — closer to how an underwriter actually sizes a loan than a simple price-to-income estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
