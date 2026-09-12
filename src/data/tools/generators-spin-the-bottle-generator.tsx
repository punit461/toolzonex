import RotateRightIcon from '@mui/icons-material/RotateRight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/spin-the-bottle-generator",
    navName: "Spin the Bottle Generator",
    navDescription: "Virtual bottle spin for party games.",
    name: "Spin the Bottle Generator - Random Direction Picker",
    description: "Spin a virtual bottle that lands on a random direction, useful as a party-game randomizer when there's no physical bottle around.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <RotateRightIcon fontSize="large" color="primary"/>,
    seoTitle: "Spin the Bottle Generator - Online Party Game Tool",
    seoDescription: "Spin a virtual bottle that lands on a random direction. Free online party-game randomizer, no physical bottle needed.",
    keywords: ["spin the bottle generator", "virtual spin the bottle", "online spin the bottle", "random direction spinner"],
    ogTitle: "Spin the Bottle Generator - Online Party Game Tool | ToolZoneX",
    ogDescription: "Spin a virtual bottle that lands on a random direction, useful as a party-game randomizer.",
    schemaName: "Spin the Bottle Generator",
    schemaDescription: "Spin a virtual bottle that lands on a random direction, useful as a party-game randomizer when there's no physical bottle around.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Wheel Spinner?", answer: "The Wheel Spinner and Name Picker Wheel pick a winner from a typed list of named entries. This tool needs no list at all — it simulates a plain spinning bottle landing on a random angle." }, { question: "Is the spin genuinely random?", answer: "Yes — the final resting angle is chosen at random each time, giving every direction an equal chance." }, { question: "Can I spin again?", answer: "Yes — click \"Spin the Bottle\" as many times as you like for a fresh, independent random spin each time." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
