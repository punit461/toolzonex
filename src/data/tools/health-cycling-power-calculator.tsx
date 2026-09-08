import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/cycling-power-calculator",
    navName: "Cycling Power Calculator",
    navDescription: "Estimated watts needed to hold a speed.",
    name: "Cycling Power Calculator",
    description: "Estimate the power output in watts needed to maintain a cycling speed from rider and bike weight, road gradient, and headwind.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsBikeIcon fontSize="large" color="primary"/>,
    seoTitle: "Cycling Power Calculator - Estimate Watts Needed",
    seoDescription: "Free cycling power calculator. Enter rider and bike weight, speed, gradient, and headwind to estimate the power output in watts needed to maintain that speed.",
    keywords: ["cycling power calculator", "watts calculator cycling", "cycling power estimator", "bike power calculator", "cycling wattage calculator"],
    ogTitle: "Cycling Power Calculator - Estimate Watts Needed | ToolZoneX",
    ogDescription: "Estimate the power output needed to maintain a cycling speed.",
    schemaName: "Cycling Power Calculator",
    schemaDescription: "Estimate cycling power output in watts from rider and bike weight, speed, road gradient, and headwind.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "Why might my actual power meter reading differ from this estimate?", answer: "Real-world power depends heavily on things this simplified model doesn't measure directly — your riding position, bike and wheel aerodynamics, tire pressure and road surface, drivetrain condition, and variable wind. This calculator uses reasonable average defaults, so treat the result as a solid ballpark rather than an exact figure." }, { question: "Why does aerodynamic drag matter so much at higher speeds?", answer: "Aerodynamic drag power scales with the cube of your speed (roughly), so doubling your speed on flat ground can increase the drag component by roughly eightfold — which is why drag dominates the power requirement at typical road cycling speeds above about 25-30 km/h." }, { question: "Can this handle a downhill (negative) gradient?", answer: "Yes — enter a negative number for the gradient. On a steep enough descent, the gravity term can turn negative and offset rolling resistance and drag entirely, which is why coasting downhill often requires no pedaling power at all." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
