import EngineeringIcon from '@mui/icons-material/Engineering';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/torque-calculator",
    navName: "Torque Calculator",
    navDescription: "Calculate torque from force & lever arm.",
    name: "Torque Calculator - Force × Distance",
    description: "Calculate torque from force and lever arm distance, shown in newton-meters, pound-feet, and pound-inches.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EngineeringIcon fontSize="large" color="primary"/>,
    seoTitle: "Torque Calculator - Force × Distance",
    seoDescription: "Free online torque calculator. Enter force and lever arm distance to calculate torque in N·m, lb-ft, and lb-in instantly.",
    keywords: ["torque calculator", "torque formula calculator", "nm to lb-ft calculator", "torque wrench calculator", "force distance torque"],
    ogTitle: "Torque Calculator - Force × Distance | ToolZoneX",
    ogDescription: "Calculate torque from force and lever arm distance instantly.",
    schemaName: "Torque Calculator",
    schemaDescription: "Calculate torque from force and lever arm distance, shown in N·m, lb-ft, and lb-in.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does the angle of the applied force matter?", answer: "Yes — this calculator assumes the force is applied perpendicular (at 90°) to the lever arm, which produces the maximum possible torque for a given force and distance. If the force is applied at an angle, the effective torque is reduced by a factor of sin(angle)." }, { question: "What is the difference between lb-ft and lb-in?", answer: "Both measure torque in the imperial system, but lb-ft uses a one-foot lever arm as the reference while lb-in uses a one-inch lever arm. Since a foot is 12 inches, 1 lb-ft equals exactly 12 lb-in." }, { question: "Why is force sometimes given in kilogram-force?", answer: "Kilogram-force is a non-SI unit still used informally in some regions and specifications, representing the force exerted by one kilogram of mass under standard gravity (9.80665 m/s²). This calculator converts it to newtons automatically for the torque calculation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
