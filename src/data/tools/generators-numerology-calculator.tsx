import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/numerology-calculator",
    navName: "Numerology Calculator",
    navDescription: "Life Path & Name Number from DOB.",
    name: "Numerology Calculator - Life Path & Name Number",
    description: "Calculate your Life Path Number from your date of birth and your Name Number from your full name, using the standard numerology reduction method with master numbers.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Numerology Calculator - Life Path Number & Name Number",
    seoDescription: "Free online numerology calculator. Calculate your Life Path Number from your date of birth and Name Number from your name, including master numbers 11, 22, and 33.",
    keywords: ["numerology calculator", "life path number calculator", "name number calculator", "numerology life path", "pythagorean numerology", "master number calculator"],
    ogTitle: "Numerology Calculator - Life Path Number & Name Number | ToolZoneX",
    ogDescription: "Calculate your Life Path Number from your date of birth and your Name Number from your full name.",
    schemaName: "Numerology Calculator",
    schemaDescription: "Calculate a Life Path Number and Name Number using standard numerology reduction methods.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "What are master numbers in numerology?", answer: "11, 22, and 33 are considered \"master numbers\" in numerology and are traditionally left unreduced rather than being summed down further, since they're believed to carry a more intense version of their base number's meaning (2, 4, and 6 respectively)." }, { question: "Is numerology scientifically accurate?", answer: "No — numerology is a belief system and form of entertainment, not a scientifically validated method for predicting personality or life events. This calculator applies the standard traditional calculation method for those exploring numerology for fun or personal reflection." }, { question: "Which name should I use for the Name Number?", answer: "Most numerology traditions use your full birth name. You can also try entering a nickname or married name to see how the Name Number changes." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
