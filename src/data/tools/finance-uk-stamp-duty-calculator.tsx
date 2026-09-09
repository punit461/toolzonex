import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/uk-stamp-duty-calculator",
    navName: "UK Stamp Duty Calculator",
    navDescription: "SDLT for England & NI, incl. first-time buyer relief.",
    name: "UK Stamp Duty Calculator (SDLT)",
    description: "Calculate Stamp Duty Land Tax for England & Northern Ireland, including first-time buyer relief and the additional-property surcharge.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "UK Stamp Duty Calculator (SDLT) - England & Northern Ireland",
    seoDescription: "Free UK Stamp Duty Land Tax (SDLT) calculator for England & Northern Ireland. Includes first-time buyer relief and the additional-property surcharge.",
    keywords: ["stamp duty calculator", "sdlt calculator", "stamp duty land tax", "first time buyer stamp duty", "uk property tax calculator", "second home stamp duty"],
    ogTitle: "UK Stamp Duty Calculator (SDLT) | ToolZoneX",
    ogDescription: "Calculate Stamp Duty Land Tax for England & Northern Ireland, including first-time buyer relief and the additional-property surcharge.",
    schemaName: "UK Stamp Duty Calculator (SDLT)",
    schemaDescription: "Calculate Stamp Duty Land Tax for England & Northern Ireland, including first-time buyer relief and the additional-property surcharge.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What happens if a first-time buyer's property is over £500,000?", answer: "First-time buyer relief is lost entirely — not just above the £500,000 slice. The full purchase price is then taxed at the standard home-mover rates instead." }, { question: "Does the additional-property surcharge apply if I'm selling my only home at the same time?", answer: "No — the 5% surcharge applies when you'll own more than one property after completion. If you sell your previous main residence within 36 months of buying the new one, you can usually reclaim the surcharge from HMRC." }, { question: "Does this cover Scotland or Wales?", answer: "No — Scotland uses Land and Buildings Transaction Tax (LBTT) and Wales uses Land Transaction Tax (LTT), both with different bands and rates than SDLT. This calculator covers England and Northern Ireland only." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
