import LayersIcon from '@mui/icons-material/Layers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/plywood-sheet-calculator",
    navName: "Plywood Sheet Calculator",
    navDescription: "Sheets needed to cover an area, with waste %.",
    name: "Plywood Sheet Calculator",
    description: "Calculate how many plywood sheets you need to cover an area, with an adjustable waste allowance.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LayersIcon fontSize="large" color="primary"/>,
    seoTitle: "Plywood Sheet Calculator - Sheets Needed for Your Project",
    seoDescription: "Free plywood sheet calculator. Enter the area to cover and sheet size to find how many plywood sheets you need, including a waste allowance.",
    keywords: ["plywood sheet calculator", "plywood calculator", "how many sheets of plywood do i need", "plywood sheets needed", "sheet material calculator"],
    ogTitle: "Plywood Sheet Calculator - Sheets Needed for Your Project | ToolZoneX",
    ogDescription: "Calculate how many plywood sheets you need to cover an area.",
    schemaName: "Plywood Sheet Calculator",
    schemaDescription: "Calculate how many plywood sheets are needed to cover an area, with an adjustable waste allowance.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why should I add a waste percentage?", answer: "Real-world cuts rarely use 100% of a sheet — layout constraints, damaged edges, and cutting around obstacles all create offcuts that can't be reused. A 10% allowance is a common starting point for straightforward rectangular layouts; more complex layouts with lots of cuts may need 15-20%." }, { question: "Can I use this for other sheet materials like OSB or drywall?", answer: "Yes — the calculation only depends on your sheet's length and width, so it works for any full-sheet building material sold in standard rectangular sizes, not just plywood. Just enter that material's sheet dimensions." }, { question: "Why does the result always round up to a whole sheet?", answer: "Suppliers sell plywood in whole sheets, not fractional pieces, so the calculator always rounds up (ceiling) rather than rounding to the nearest whole number — you can't buy 10.3 sheets, so it rounds to 11." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
