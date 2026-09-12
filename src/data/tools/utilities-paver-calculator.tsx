import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/paver-calculator",
    navName: "Paver Calculator",
    navDescription: "Estimate how many pavers you need.",
    name: "Paver Calculator",
    description: "Calculate how many pavers you need for a patio, walkway, or driveway based on area and paver size.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Paver Calculator - How Many Pavers Do I Need?",
    seoDescription: "Free paver calculator. Enter the area to cover and paver size to find how many pavers you need, with an adjustable waste allowance.",
    keywords: ["paver calculator", "how many pavers do i need", "patio paver calculator", "paver quantity calculator", "paving stone calculator"],
    ogTitle: "Paver Calculator - How Many Pavers Do I Need? | ToolZoneX",
    ogDescription: "Estimate how many pavers you need for your project.",
    schemaName: "Paver Calculator",
    schemaDescription: "Calculate the number of pavers needed to cover a given area, including a waste allowance.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How much waste allowance should I use?", answer: "For a simple rectangular area laid in a straight running-bond pattern, 5-10% is usually enough. For diagonal layouts, herringbone patterns, curved borders, or areas with lots of cuts around edges and obstacles, consider bumping it up to 15-20%." }, { question: "Should I include the gaps between pavers?", answer: "This calculator assumes pavers are laid edge-to-edge. If your design uses wide jointing sand gaps between pavers, the effective coverage per paver is slightly smaller, so you may need a few more than this estimate shows." }, { question: "Does this account for the base material needed underneath?", answer: "No — this only estimates the number of paver units for the surface area. You'll separately need to budget for a compacted gravel base, sand bedding layer, and edge restraints depending on your project." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
