import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ink-usage-calculator",
    navName: "Ink Usage Calculator",
    navDescription: "Monthly/annual printer ink cost.",
    name: "Ink Usage Calculator",
    description: "Estimate monthly and annual printer ink or toner cost from your print volume, ink coverage, cartridge yield, and cartridge price.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "Ink Usage Calculator - Monthly & Annual Printer Ink Cost",
    seoDescription: "Free ink usage calculator. Enter pages printed per month, ink coverage, cartridge yield, and cost to estimate your real monthly and annual ink spend.",
    keywords: ["ink usage calculator", "printer ink cost calculator", "cartridge yield calculator", "toner cost calculator", "printing cost calculator"],
    ogTitle: "Ink Usage Calculator - Monthly & Annual Printer Ink Cost | ToolZoneX",
    ogDescription: "Estimate monthly and annual printer ink cost from your print volume and cartridge specs.",
    schemaName: "Ink Usage Calculator",
    schemaDescription: "Estimate monthly and annual printer ink cost from print volume, ink coverage, cartridge yield, and cartridge price.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is 5% coverage used as the baseline?", answer: "Nearly all printer manufacturers rate cartridge page yields under the ISO/IEC standard test, which uses a mixed document with about 5% average ink coverage per page — that's why 5% is the default here and the reference point the formula scales from." }, { question: "What if my documents are mostly plain text with wide margins?", answer: "Lower your coverage percentage below 5% — light text-only pages can use less ink than the standard test page, which would make your effective yield higher than the rated yield." }, { question: "Does this account for color versus black ink separately?", answer: "No — this calculator treats a single cartridge and coverage figure at a time. For a printer with separate color and black cartridges, run the calculator once per cartridge type using each one's own rated yield and cost." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
