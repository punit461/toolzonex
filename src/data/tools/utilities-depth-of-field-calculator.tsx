import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/depth-of-field-calculator",
    navName: "Depth of Field Calculator",
    navDescription: "Near/far focus limits from focal length & aperture.",
    name: "Depth of Field Calculator - Photography DOF Calculator",
    description: "Calculate near and far depth-of-field boundaries from focal length, aperture, subject distance, and sensor size.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Depth of Field Calculator - Photography DOF Calculator",
    seoDescription: "Free depth of field calculator. Enter focal length, aperture, subject distance, and sensor size to find near/far focus limits and hyperfocal distance.",
    keywords: ["depth of field calculator", "dof calculator", "hyperfocal distance calculator", "photography depth of field", "circle of confusion calculator"],
    ogTitle: "Depth of Field Calculator - Photography DOF Calculator | ToolZoneX",
    ogDescription: "Calculate near and far depth-of-field boundaries from focal length, aperture, subject distance, and sensor size.",
    schemaName: "Depth of Field Calculator",
    schemaDescription: "Calculate near/far depth-of-field boundaries and hyperfocal distance from focal length, aperture, subject distance, and sensor size.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does sensor size affect depth of field?", answer: "Smaller sensors require a shorter focal length to achieve the same field of view as a larger sensor, and shorter focal lengths naturally produce more depth of field at a given aperture — which is why phone cameras (very small sensors) struggle to produce shallow-depth-of-field background blur compared to full-frame cameras." }, { question: "What is the circle of confusion?", answer: "The circle of confusion is the largest blur spot the human eye still perceives as a sharp point at normal viewing distances. It's a standardized value that scales with sensor size — this calculator uses 0.03mm for full-frame and scales it down proportionally for smaller sensors via their crop factor." }, { question: "What happens if my subject distance is beyond the hyperfocal distance?", answer: "Once your subject distance meets or exceeds the hyperfocal distance, everything from roughly half that distance out to infinity is in acceptable focus — the calculator shows the far limit as infinite (∞) in that case." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
