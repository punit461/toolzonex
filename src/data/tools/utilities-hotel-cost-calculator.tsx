import HotelIcon from '@mui/icons-material/Hotel';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/hotel-cost-calculator",
    navName: "Hotel Cost Calculator",
    navDescription: "Total hotel cost with tax & fees.",
    name: "Hotel Cost Calculator",
    description: "Calculate the total cost of a hotel stay including nightly rate, taxes, and resort/service fees across multiple nights and rooms.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HotelIcon fontSize="large" color="primary"/>,
    seoTitle: "Hotel Cost Calculator - Total Stay Cost With Tax & Fees",
    seoDescription: "Free hotel cost calculator. Enter nightly rate, nights, rooms, tax rate, and resort fee to see your full hotel stay cost breakdown.",
    keywords: ["hotel cost calculator", "hotel stay cost calculator", "hotel tax and fees calculator", "resort fee calculator", "hotel budget calculator"],
    ogTitle: "Hotel Cost Calculator - Total Stay Cost With Tax & Fees | ToolZoneX",
    ogDescription: "Calculate the total cost of a hotel stay including tax and resort fees.",
    schemaName: "Hotel Cost Calculator",
    schemaDescription: "Calculate total hotel stay cost from nightly rate, nights, rooms, tax rate, and resort/service fees.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between a tax rate and a resort/service fee?", answer: "Tax is a percentage set by local government and applied to the room subtotal, while a resort or service fee is a flat charge set by the hotel itself, often per room per night, covering amenities like pools, gyms, or Wi-Fi regardless of whether you use them." }, { question: "Why do some hotels not charge a resort fee at all?", answer: "Resort fees are more common at hotels with extensive amenities (resorts, larger city hotels) and less common at budget or extended-stay properties. Set the fee field to 0 if your hotel doesn't charge one." }, { question: "Does this include one-time fees like parking or a deposit?", answer: "No — this calculator covers recurring per-night charges (rate, tax, and a per-night fee) multiplied across your stay and room count. Add any one-time charges, like a security deposit or a single parking fee, to the total separately." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
