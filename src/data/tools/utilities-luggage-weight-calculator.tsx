import LuggageIcon from '@mui/icons-material/Luggage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/luggage-weight-calculator",
    navName: "Luggage Weight Calculator",
    navDescription: "Check bags against an airline weight limit.",
    name: "Luggage Weight Calculator",
    description: "Track multiple bags' weights against an airline weight limit, with a running total and pass/fail per bag in kg or lb.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LuggageIcon fontSize="large" color="primary"/>,
    seoTitle: "Luggage Weight Calculator - Check Bags Against Airline Limits",
    seoDescription: "Free luggage weight calculator. Add your bags and an airline weight limit to see which bags pass or fail, plus your total combined luggage weight.",
    keywords: ["luggage weight calculator", "baggage weight calculator", "airline weight limit calculator", "checked bag weight calculator", "suitcase weight calculator"],
    ogTitle: "Luggage Weight Calculator - Check Bags Against Airline Limits | ToolZoneX",
    ogDescription: "Check multiple bags against an airline weight limit with a running total.",
    schemaName: "Luggage Weight Calculator",
    schemaDescription: "Track multiple bags' weights against an airline weight limit, with pass/fail per bag and a combined total.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is the weight limit always per bag, or can it be a combined total?", answer: "It depends on the airline and fare class — most economy fares enforce a strict per-bag limit (commonly 23 kg / 50 lb), while some premium fares or specific airlines allow a combined weight across multiple bags. Check your airline's specific baggage policy, since this varies significantly." }, { question: "Do carry-on bags use the same limit?", answer: "No — carry-on weight limits are usually much lower than checked bag limits and are enforced separately. Run this calculator once for your checked bags and, if needed, again with your carry-on allowance." }, { question: "What happens if a bag is over the limit?", answer: "Airlines typically charge an overweight baggage fee, which can be significant. It's usually cheaper to redistribute weight between bags (if you have room in another bag) than to pay the fee at check-in." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
