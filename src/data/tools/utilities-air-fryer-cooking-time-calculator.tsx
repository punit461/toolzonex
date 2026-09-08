import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/air-fryer-cooking-time-calculator",
    navName: "Air Fryer Cooking Time Calculator",
    navDescription: "Convert oven temp and time to air fryer settings.",
    name: "Air Fryer Cooking Time Calculator",
    description: "Convert a conventional oven temperature and cook time to estimated air fryer settings using standard conversion guidelines.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <WhatshotIcon fontSize="large" color="primary"/>,
    seoTitle: "Air Fryer Cooking Time Calculator - Oven to Air Fryer",
    seoDescription: "Free air fryer conversion calculator. Enter oven temperature and cook time to calculate equivalent air fryer temperature and time.",
    keywords: ["air fryer cooking time calculator", "oven to air fryer conversion calculator", "air fryer temperature calculator", "air fryer conversion chart calculator", "air fryer time calculator"],
    ogTitle: "Air Fryer Cooking Time Calculator - Oven to Air Fryer | ToolZoneX",
    ogDescription: "Convert a conventional oven temperature and cook time to estimated air fryer settings.",
    schemaName: "Air Fryer Cooking Time Calculator",
    schemaDescription: "Calculate air fryer temperature as oven temperature minus 25F (or 15C), and air fryer time as oven time times 0.8.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is the -25°F and 20% time reduction exact for every air fryer?", answer: "No — this is a commonly used starting-point guideline, not an exact science. Actual air fryer models vary significantly in wattage, basket size, and airflow design, so always check food for doneness rather than relying on the adjusted numbers alone." }, { question: "Should I preheat the air fryer?", answer: "Many air fryers benefit from a short preheat (2-5 minutes) for the most accurate results, similar to a conventional oven, though some recipes and models skip this step. Check your air fryer's manual for its specific recommendation." }, { question: "Why does the air fryer need less time at a similar temperature?", answer: "Air fryers use a small, enclosed chamber with a powerful fan that circulates hot air directly around the food, transferring heat much faster and more evenly than the larger air volume in a conventional oven." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
