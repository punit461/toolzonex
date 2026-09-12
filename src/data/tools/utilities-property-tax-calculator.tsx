import HomeIcon from '@mui/icons-material/Home';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/property-tax-calculator",
    navName: "Property Tax Calculator",
    navDescription: "Estimate annual property tax by mill rate or effective rate.",
    name: "Property Tax Calculator",
    description: "Calculate annual and monthly property tax using mill rate or effective tax rate. Includes county, school, and local breakdown.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Property Tax Calculator - Mill Rate & Effective Rate",
    seoDescription: "Free property tax calculator. Estimate annual and monthly property tax using mill rate or effective rate, with jurisdiction breakdown.",
    keywords: ["property tax calculator", "mill rate calculator", "property tax rate", "home tax calculator", "real estate tax calculator"],
    ogTitle: "Property Tax Calculator - Mill Rate & Effective Rate | ToolZoneX",
    ogDescription: "Calculate annual and monthly property tax using mill rate or effective tax rate.",
    schemaName: "Property Tax Calculator",
    schemaDescription: "Calculate annual and monthly property tax using mill rate or effective tax rate.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a mill rate?", answer: "A mill rate is the amount of tax payable per $1,000 of assessed property value. A mill rate of 15 means you pay $15 per $1,000, or 1.5%." }, { question: "Why does property tax vary so much by location?", answer: "Property tax rates are set by local governments based on their budget needs and the total assessed value of properties in the area." }, { question: "Can I appeal my property tax assessment?", answer: "Yes — most jurisdictions allow you to appeal if you believe your property has been assessed above its market value." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
