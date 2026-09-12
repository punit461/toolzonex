import SettingsIcon from '@mui/icons-material/Settings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/gear-ratio-calculator",
    navName: "Gear Ratio Calculator",
    navDescription: "Calculate gear ratio & compound ratios.",
    name: "Gear Ratio Calculator - Single & Compound Gear Trains",
    description: "Calculate gear ratio from driving and driven gear teeth counts, with support for multi-stage compound gear trains.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SettingsIcon fontSize="large" color="primary"/>,
    seoTitle: "Gear Ratio Calculator - Single & Compound Gear Trains",
    seoDescription: "Free online gear ratio calculator. Enter driving and driven gear teeth counts to calculate ratio, with support for multi-stage compound gear trains.",
    keywords: ["gear ratio calculator", "gear ratio formula", "compound gear ratio calculator", "gear teeth ratio calculator", "gearbox ratio calculator"],
    ogTitle: "Gear Ratio Calculator - Single & Compound Gear Trains | ToolZoneX",
    ogDescription: "Calculate gear ratio and compound gear train ratios instantly.",
    schemaName: "Gear Ratio Calculator",
    schemaDescription: "Calculate gear ratio from driving and driven gear teeth counts, with multi-stage compound support.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Which gear is the \"driving\" gear?", answer: "The driving gear is the one connected to the power source (like a motor shaft or pedal crank), and the driven gear is the one that receives motion from it. Torque and speed both scale with the ratio between them, in opposite directions." }, { question: "How does compound ratio work for multiple gear stages?", answer: "Each pair of meshing gears forms one stage. In a gear train, the driven gear of one stage is typically connected to the driving gear of the next stage, so the overall reduction is the product of every individual stage ratio, not their sum." }, { question: "Does gear ratio depend on gear diameter instead of teeth count?", answer: "Teeth count and diameter are proportional for gears of the same tooth pitch (tooth size), so using teeth counts gives the same ratio as using diameters, and is usually easier to count accurately." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
