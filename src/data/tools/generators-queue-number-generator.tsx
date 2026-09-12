import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/queue-number-generator",
    navName: "Queue Number Generator",
    navDescription: "Generate sequential, zero-padded queue ticket numbers.",
    name: "Queue Number Generator - Sequential Ticket Numbers",
    description: "Generate a sequential list of queue or ticket numbers with an optional prefix, zero-padded to a consistent width, ready for printing.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Queue Number Generator - Sequential Ticket Numbers",
    seoDescription: "Free online queue number generator. Create sequential, zero-padded queue or ticket numbers with an optional prefix, ready for printing.",
    keywords: ["queue number generator", "ticket number generator online", "sequential number generator", "queue ticket maker", "token number generator"],
    ogTitle: "Queue Number Generator - Sequential Ticket Numbers | ToolZoneX",
    ogDescription: "Create sequential, zero-padded queue or ticket numbers ready for printing.",
    schemaName: "Queue Number Generator",
    schemaDescription: "Generate a sequential list of queue or ticket numbers with an optional prefix, zero-padded to a consistent width, ready for printing.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I skip the prefix entirely?", answer: "Yes — leave the prefix field blank and the tool generates plain zero-padded numbers without any letter or dash prefix." }, { question: "How is the zero-padding width decided?", answer: "The tool pads every number to match the digit length of the highest number in your range (with a minimum of two digits), so all tickets in a batch line up visually." }, { question: "Can I start from a number other than 1?", answer: "Yes — set any starting number you like, which is useful for continuing a queue from a previous batch of tickets." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
