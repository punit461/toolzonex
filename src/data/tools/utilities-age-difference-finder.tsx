import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/age-difference-finder",
    navName: "Age Difference Finder",
    navDescription: "Age gap between two birthdates.",
    name: "Age Difference Finder",
    description: "Calculate the exact age difference between two people's birthdates in years, months, and days, and see which one is older.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Age Difference Finder - Age Gap Between Two Dates",
    seoDescription: "Free age difference finder. Enter two birthdates to calculate the exact age gap in years, months, and days, and see which person is older.",
    keywords: ["age difference finder", "age gap calculator", "age difference calculator", "date difference between two dates", "relationship age gap calculator"],
    ogTitle: "Age Difference Finder - Age Gap Between Two Dates | ToolZoneX",
    ogDescription: "Calculate the exact age difference between two people's birthdates.",
    schemaName: "Age Difference Finder",
    schemaDescription: "Calculate the exact age difference between two people's birthdates in years, months, and days, and see which one is older.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Age Calculator?", answer: "The Age Calculator computes one person's current age by comparing their birthdate to today. This Age Difference Finder instead computes the gap between two people's birthdates directly — useful for relationship age-gap checks or sibling spacing, regardless of what today's date is." }, { question: "Does the order I enter the two dates matter?", answer: "No — the tool always calculates the absolute difference and tells you which date is older, so entering the dates in either order gives the same result." }, { question: "Does it account for leap years?", answer: "Yes — the calculation correctly handles leap years and varying month lengths, the same way a standard age calculator does." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
