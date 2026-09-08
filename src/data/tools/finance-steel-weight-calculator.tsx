import StraightenIcon from '@mui/icons-material/Straighten';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/steel-weight-calculator",
    navName: "Steel Weight Calculator",
    navDescription: "MS & SS weight by shape & dimensions.",
    name: "Steel Weight Calculator",
    description: "Calculate the weight of mild steel (MS) and stainless steel (SS) bars, plates, pipes, and tubes from dimensions.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <StraightenIcon fontSize="large" color="primary"/>,
    seoTitle: "Steel Weight Calculator - MS & SS Weight Calculator",
    seoDescription: "Free steel weight calculator for MS and SS bars, plates, pipes, and tubes. Compute weight from volume and density.",
    keywords: ["steel weight calculator", "MS weight calculator", "SS weight calculator", "metal weight", "pipe weight", "bar weight"],
    ogTitle: "Steel Weight Calculator - MS & SS Weight Calculator | ToolZoneX",
    ogDescription: "Calculate MS and SS steel weight by shape and dimensions.",
    schemaName: "Steel Weight Calculator",
    schemaDescription: "Calculate the weight of MS and SS steel by shape and dimensions.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
