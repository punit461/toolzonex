import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cat-age-calculator",
    navName: "Cat Age Calculator",
    navDescription: "Convert cat years to human years.",
    name: "Cat Age Calculator - Convert Cat Years to Human Years",
    description: "Convert your cat's actual age to human-equivalent years using the standard non-linear vet conversion scale, with a full reference table.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Cat Age Calculator - Convert Cat Years to Human Years",
    seoDescription: "Free cat age calculator. Convert your cat's age to human years using the standard non-linear scale (15 + 9 + 4 per year), with a reference table.",
    keywords: ["cat age calculator", "cat years to human years", "how old is my cat in human years", "cat age in human years", "cat age converter"],
    ogTitle: "Cat Age Calculator - Convert Cat Years to Human Years | ToolZoneX",
    ogDescription: "Convert your cat's age into human-equivalent years.",
    schemaName: "Cat Age Calculator",
    schemaDescription: "Convert a cat's actual age to human-equivalent years using the standard non-linear conversion scale.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why isn't it just \"1 cat year = 7 human years\"?", answer: "That old rule of thumb badly understates how fast cats mature early on and overstates aging later in life. A 1-year-old cat is already sexually mature and roughly equivalent to a 15-year-old human — nowhere close to 7 — which is why vets use a non-linear scale instead of a flat multiplier." }, { question: "Does breed or size affect cat aging the way it does for dogs?", answer: "Size has a much smaller effect on cat aging than it does for dogs, where large breeds age noticeably faster. Most standard cat-to-human age conversions apply the same non-linear scale regardless of breed." }, { question: "At what age is a cat considered a senior?", answer: "Cats are generally considered mature around 7-10 years and senior from about 11 years onward, which corresponds to roughly 60+ human-equivalent years on this scale." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
