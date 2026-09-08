import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/bmr-tdee-calculator",
    navName: "BMR + TDEE Calculator",
    navDescription: "BMR and TDEE together in one flow.",
    name: "BMR + TDEE Calculator",
    description: "Calculate your BMR (Mifflin-St Jeor) and TDEE together in a single flow, without visiting two separate calculators.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <WhatshotIcon fontSize="large" color="primary"/>,
    seoTitle: "BMR + TDEE Calculator - Both Numbers in One Flow",
    seoDescription: "Free combined BMR and TDEE calculator. Get your Basal Metabolic Rate and Total Daily Energy Expenditure together in a single flow, no second page needed.",
    keywords: ["bmr tdee calculator", "combined bmr tdee calculator", "bmr and tdee calculator together", "total daily energy expenditure calculator", "basal metabolic rate and tdee"],
    ogTitle: "BMR + TDEE Calculator - Both Numbers in One Flow | ToolZoneX",
    ogDescription: "Get your BMR and TDEE together in a single flow.",
    schemaName: "BMR + TDEE Calculator",
    schemaDescription: "Calculate BMR and TDEE together in a single flow using the Mifflin-St Jeor equation and activity multipliers.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the separate BMR and TDEE calculators on this site?", answer: "Functionally, it uses the same Mifflin-St Jeor formula and the same activity multipliers as our standalone BMR Calculator and TDEE Calculator. The difference is convenience: instead of calculating your BMR on one page and then re-entering your details on a second page to get your TDEE, this combined tool shows both numbers together from a single set of inputs." }, { question: "What does TDEE stand for?", answer: "TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a full day, combining your resting metabolism (BMR) with all activity, exercise, and digestion." }, { question: "How is TDEE different from BMR?", answer: "BMR is calories burned at complete rest; TDEE (Total Daily Energy Expenditure) adds your activity level on top, giving a more realistic picture of your actual daily calorie burn." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
