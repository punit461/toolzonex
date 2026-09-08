import ScaleIcon from '@mui/icons-material/Scale';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/packaging-weight-calculator",
    navName: "Packaging Weight Calculator",
    navDescription: "Total package weight from items & packaging.",
    name: "Packaging Weight Calculator",
    description: "Calculate total package weight from item weight, quantity per package, and a list of packaging component weights.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ScaleIcon fontSize="large" color="primary"/>,
    seoTitle: "Packaging Weight Calculator - Total Package Weight",
    seoDescription: "Free packaging weight calculator. Enter item weight, quantity, and packaging component weights to calculate total package weight.",
    keywords: ["packaging weight calculator", "total package weight calculator", "shipping weight calculator", "how to calculate package weight", "box weight calculator"],
    ogTitle: "Packaging Weight Calculator - Total Package Weight | ToolZoneX",
    ogDescription: "Calculate total package weight from item weight, quantity, and packaging component weights.",
    schemaName: "Packaging Weight Calculator",
    schemaDescription: "Calculate total package weight as item weight times quantity, plus the sum of all packaging component weights.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Packaging Cost Calculator?", answer: "The Packaging Cost Calculator adds up the dollar cost of materials, labor, and shipping per unit. This tool computes physical weight only — no cost figures at all — for when you need a total weight, not a total cost." }, { question: "How does this relate to the Freight Cost Calculator?", answer: "The Freight Cost Calculator bills a shipment based on whichever is greater between its actual weight and its volumetric (dimensional) weight. This tool helps you produce that actual total weight figure — item weight plus every packaging component — which you can then plug into the Freight Cost Calculator as the actual weight input." }, { question: "Should I include the shipping label or documents in packaging weight?", answer: "For most real-world purposes their weight is negligible, but if you want a precise total, add them as an extra component row with their approximate weight." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
