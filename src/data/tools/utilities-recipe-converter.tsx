import KitchenIcon from '@mui/icons-material/Kitchen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/recipe-converter",
    navName: "Recipe Converter",
    navDescription: "Scale recipe ingredients to any serving size.",
    name: "Recipe Converter",
    description: "Scale every ingredient in a recipe up or down to a new serving count, keeping the original proportions intact.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <KitchenIcon fontSize="large" color="primary"/>,
    seoTitle: "Recipe Converter - Scale Ingredients to Any Serving Size",
    seoDescription: "Free recipe converter. Enter original and desired servings plus your ingredient list to scale every quantity proportionally.",
    keywords: ["recipe converter", "recipe scaler", "scale recipe calculator", "recipe serving size converter", "ingredient scaling calculator"],
    ogTitle: "Recipe Converter - Scale Ingredients to Any Serving Size | ToolZoneX",
    ogDescription: "Scale every ingredient in a recipe to a new serving count while keeping proportions intact.",
    schemaName: "Recipe Converter",
    schemaDescription: "Scale a recipe's ingredient quantities from an original serving count to a desired serving count.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does scaling work the same for every ingredient?", answer: "Mostly, but not perfectly for everything — leavening agents (baking powder, baking soda, yeast), spices, and salt don't always scale linearly in large batches, so taste and adjust seasoning-related ingredients rather than following the math exactly at extreme scale factors." }, { question: "What about cooking time when I scale a recipe?", answer: "Cooking and baking times generally don't scale proportionally with quantity — a doubled batch in a larger pan often needs only slightly longer, not twice as long. Watch for visual and temperature doneness cues rather than just multiplying the time." }, { question: "Can I mix different units in the same recipe?", answer: "Yes — each ingredient row has its own unit field, so you can list flour in cups, butter in tablespoons, and salt in teaspoons in the same recipe. The scaling factor applies to the quantity number regardless of unit." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
