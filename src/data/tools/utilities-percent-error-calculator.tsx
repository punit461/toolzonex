import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/percent-error-calculator",
    navName: "Percent Error Calculator",
    navDescription: "Compare a measured value to the accepted value.",
    name: "Percent Error Calculator - Measured vs. Accepted Value",
    description: "Calculate percent error between a measured/experimental value and a theoretical/accepted value.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Percent Error Calculator - Measured vs. Accepted Value",
    seoDescription: "Free percent error calculator. Enter your measured and accepted values to calculate percent error instantly, with over/underestimate direction.",
    keywords: ["percent error calculator", "percentage error formula", "experimental error calculator", "percent error chemistry", "percent error physics"],
    ogTitle: "Percent Error Calculator - Measured vs. Accepted Value | ToolZoneX",
    ogDescription: "Calculate percent error between a measured and accepted value.",
    schemaName: "Percent Error Calculator",
    schemaDescription: "Calculate percent error between a measured/experimental value and a theoretical/accepted value.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between percent error and percent difference?", answer: "Percent error compares a measured value against a known, accepted, or theoretical value — treating one value as the \"truth.\" Percent difference instead compares two measured values of equal standing, with neither treated as more correct than the other." }, { question: "Can percent error be negative?", answer: "The standard definition uses an absolute value, so percent error itself is always zero or positive. This calculator also shows the signed version so you can see whether your measured value overestimated or underestimated the accepted value." }, { question: "What counts as a \"good\" percent error?", answer: "It depends entirely on the context — a percent error under 5% is often considered good in many school science experiments, but precision manufacturing or analytical chemistry may require far smaller errors, sometimes well under 1%." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
