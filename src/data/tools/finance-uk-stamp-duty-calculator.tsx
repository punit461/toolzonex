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
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
