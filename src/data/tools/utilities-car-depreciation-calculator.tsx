import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/car-depreciation-calculator",
    navName: "Car Depreciation Calculator",
    navDescription: "Estimate your car's value over time.",
    name: "Car Depreciation Calculator",
    description: "Calculate your car's depreciation over time using the declining balance method. See year-by-year values and compare rate presets.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Car Depreciation Calculator - Estimate Vehicle Value",
    seoDescription: "Free car depreciation calculator to estimate how your vehicle loses value over time. See year-by-year depreciation with rate presets.",
    keywords: ["car depreciation calculator", "vehicle depreciation", "car value calculator", "how much is my car worth", "depreciation rate calculator"],
    ogTitle: "Car Depreciation Calculator - Estimate Vehicle Value | ToolZoneX",
    ogDescription: "Calculate your car's depreciation over time using the declining balance method.",
    schemaName: "Car Depreciation Calculator",
    schemaDescription: "Calculate your car's depreciation over time using the declining balance method.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the average depreciation rate for a car?", answer: "Most cars lose about 15–20% of their value per year, with the steepest drop in the first year. Luxury and high-mileage vehicles may depreciate faster." }, { question: "Does mileage affect depreciation?", answer: "Yes — higher mileage accelerates depreciation. A car driven 20,000 miles per year will lose value faster than one driven 10,000 miles." }, { question: "Can a car appreciate in value?", answer: "Most cars depreciate, but certain classic, limited-edition, or rare models can appreciate over time. Supply chain disruptions can also temporarily boost used car values." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
