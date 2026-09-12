import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/carpet-area-calculator",
    navName: "Carpet Area Calculator",
    navDescription: "Estimate carpet for multiple rooms.",
    name: "Carpet Area Calculator",
    description: "Calculate the carpet area needed for one or more rooms, including wastage allowance, in square feet and square yards.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "Carpet Area Calculator - Estimate Carpet for Rooms",
    seoDescription: "Free carpet area calculator. Enter room dimensions and wastage to estimate the carpet you need in square feet and square yards, with estimated cost.",
    keywords: ["carpet area calculator", "carpet calculator", "carpet needed calculator", "flooring calculator", "square yards carpet", "carpet cost estimator"],
    ogTitle: "Carpet Area Calculator - Estimate Carpet for Rooms | ToolZoneX",
    ogDescription: "Calculate the carpet area needed for multiple rooms with wastage, in sq ft and sq yd.",
    schemaName: "Carpet Area Calculator",
    schemaDescription: "Calculate carpet area needed for one or more rooms including wastage.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How much wastage should I add?", answer: "A 10% allowance is typical. Rooms with many alcoves, angles, or patterned carpet that must be matched may need 15% or more." }, { question: "How do I convert square feet to square yards?", answer: "Divide the square footage by 9. Carpet is commonly sold by the square yard in the US." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
