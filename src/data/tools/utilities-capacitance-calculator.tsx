import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/capacitance-calculator",
    navName: "Capacitance Calculator",
    navDescription: "Calculate parallel plate capacitor capacitance.",
    name: "Capacitance Calculator - Parallel Plate Capacitor",
    description: "Calculate the capacitance of a parallel plate capacitor from plate area, plate separation, and dielectric constant.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricalServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Capacitance Calculator - Parallel Plate Capacitor",
    seoDescription: "Free capacitance calculator. Enter plate area, distance between plates, and dielectric material to calculate capacitance using C = ε0εrA/d.",
    keywords: ["capacitance calculator", "parallel plate capacitor calculator", "capacitor calculator", "dielectric constant calculator", "c = e0 er a d calculator"],
    ogTitle: "Capacitance Calculator | ToolZoneX",
    ogDescription: "Calculate parallel plate capacitor capacitance.",
    schemaName: "Capacitance Calculator",
    schemaDescription: "Calculate the capacitance of a parallel plate capacitor from plate area, plate separation, and dielectric constant.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a dielectric constant (relative permittivity)?", answer: "It's the ratio of a material's permittivity to that of a vacuum, describing how much better that material is at storing electric field energy compared to empty space. A higher dielectric constant means more capacitance for the same plate area and spacing." }, { question: "Does this account for real-world fringing effects?", answer: "No — this uses the idealized formula that assumes a uniform electric field between infinite parallel plates. Real capacitors have fringing fields at the plate edges, which make measured capacitance somewhat higher than this calculation, especially when the plate separation isn't small compared to the plate size." }, { question: "How does the distance between plates affect capacitance?", answer: "Capacitance is inversely proportional to plate separation, so halving the gap between the plates doubles the capacitance, while doubling the gap halves it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
