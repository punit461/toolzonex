import HeightIcon from '@mui/icons-material/Height';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/body-surface-area-calculator",
    navName: "Body Surface Area Calculator",
    navDescription: "Calculate BSA in m² for adults.",
    name: "Body Surface Area Calculator",
    description: "Calculate body surface area (BSA) in m² using the Mosteller and Du Bois formulas from height and weight. Useful for chemo dosing and clinical estimates.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <HeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Body Surface Area Calculator - BSA in m² (Mosteller & Du Bois)",
    seoDescription: "Free body surface area (BSA) calculator. Estimate BSA in m² using the Mosteller and Du Bois formulas from height and weight, with the normal adult reference range.",
    keywords: ["body surface area calculator", "bsa calculator", "mosteller formula", "du bois formula", "body surface area", "chemotherapy dosing", "bsa m2"],
    ogTitle: "Body Surface Area Calculator - BSA in m² (Mosteller & Du Bois) | ToolZoneX",
    ogDescription: "Estimate body surface area in m² using the Mosteller and Du Bois formulas from height and weight.",
    schemaName: "Body Surface Area Calculator",
    schemaDescription: "Calculate body surface area (BSA) in m² using the Mosteller and Du Bois formulas.",
    applicationCategory: "HealthApplication",
    currency: "USD",
    faqs: [{ question: "What is a normal BSA for an adult?", answer: "Most healthy adults have a BSA between roughly 1.7 and 1.9 m². Values outside this range just reflect body size." }, { question: "Why is BSA used for chemotherapy dosing?", answer: "Chemotherapy drugs have a narrow therapeutic window, and many physiological processes scale better with surface area than weight alone, so dosing per m² improves accuracy." }, { question: "Which formula should I use?", answer: "The Mosteller formula is most common today because it's simple and accurate; the Du Bois formula is the older, frequently referenced one. For most adults they agree within a few percent." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
