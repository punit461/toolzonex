import GroupIcon from '@mui/icons-material/Group';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/split-bill-calculator",
    navName: "Split Bill Calculator",
    navDescription: "Even or itemized bill splitting.",
    name: "Split Bill Calculator",
    description: "Split a bill evenly among a group with tip, or itemize individual items assigned to each person with a proportional tip split.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <GroupIcon fontSize="large" color="primary"/>,
    seoTitle: "Split Bill Calculator - Even or Itemized Bill Splitting",
    seoDescription: "Free split bill calculator. Split a bill evenly among a group with tip, or itemize what each person ordered for a fair, proportional split.",
    keywords: ["split bill calculator", "bill splitter", "how to split a bill calculator", "itemized bill split calculator", "group bill calculator"],
    ogTitle: "Split Bill Calculator - Even or Itemized | ToolZoneX",
    ogDescription: "Split a bill evenly or itemize what each person owes with a proportional tip split.",
    schemaName: "Split Bill Calculator",
    schemaDescription: "Split a bill evenly among a group with tip, or itemize individual items assigned to each person with a proportional tip split.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does the itemized mode split the tip proportionally instead of evenly?", answer: "Splitting the tip proportionally to what each person ordered is generally considered fairer than an equal split — someone who ordered a $40 steak benefits more from the service than someone who ordered a $8 side salad, so their tip contribution scales accordingly." }, { question: "Can multiple items be assigned to the same person?", answer: "Yes — add as many item rows as needed and assign the same person's name to each item they ordered. The calculator sums every item assigned to that name into their subtotal automatically." }, { question: "How do I split a shared item, like an appetizer everyone eats?", answer: "Add it as its own row and assign it to one placeholder name (like \"Shared\"), or divide its price evenly and add a fractional line item for each person who shared it, so it's reflected in each person's subtotal." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
