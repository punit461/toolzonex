import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/dog-age-calculator",
    navName: "Dog Age Calculator",
    navDescription: "Convert dog years to human years.",
    name: "Dog Age Calculator",
    description: "Convert your dog's age to human-equivalent years using logarithmic and linear formulas. Includes size-adjusted estimates.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Dog Age Calculator - Convert Dog Years to Human Years",
    seoDescription: "Free dog age calculator. Convert dog years to human years using research-based logarithmic and linear formulas with size adjustment.",
    keywords: ["dog age calculator", "dog years to human years", "how old is my dog in human years", "dog age converter", "pet age calculator"],
    ogTitle: "Dog Age Calculator - Convert Dog Years to Human Years | ToolZoneX",
    ogDescription: "Convert your dog's age to human-equivalent years using logarithmic and linear formulas.",
    schemaName: "Dog Age Calculator",
    schemaDescription: "Convert your dog's age to human-equivalent years using logarithmic and linear formulas.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is the '1 dog year = 7 human years' formula wrong?", answer: "Dogs mature much faster than humans in their first two years. A 1-year-old dog is roughly sexually mature (like a 15-year-old human), so the logarithmic formula better captures this non-linear aging." }, { question: "How does size affect dog aging?", answer: "Research shows smaller breeds tend to live longer than large breeds. A 10-year-old Chihuahua is biologically younger than a 10-year-old Great Dane." }, { question: "At what age is a dog considered senior?", answer: "Generally, dogs are considered senior around 7 years for medium/large breeds and 10+ years for small breeds. Giant breeds may be senior as early as 5–6 years." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
