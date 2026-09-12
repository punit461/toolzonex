import AirIcon from '@mui/icons-material/Air';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wind-load-calculator",
    navName: "Wind Load Calculator",
    navDescription: "Estimate wind force on a surface.",
    name: "Wind Load Calculator - Estimate Wind Force on a Surface",
    description: "Estimate wind load force on a surface from wind speed, surface area, and a drag coefficient, using the standard wind pressure formula.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AirIcon fontSize="large" color="primary"/>,
    seoTitle: "Wind Load Calculator - Estimate Wind Force on a Surface",
    seoDescription: "Free wind load calculator. Enter wind speed, surface area, and shape to estimate wind force using F = 0.5 × air density × v² × Cd × Area.",
    keywords: ["wind load calculator", "wind force calculator", "wind pressure calculator", "wind load on a sign calculator", "drag force calculator"],
    ogTitle: "Wind Load Calculator - Estimate Wind Force on a Surface | ToolZoneX",
    ogDescription: "Estimate wind load force on a surface using the standard wind pressure formula.",
    schemaName: "Wind Load Calculator",
    schemaDescription: "Estimate wind load force on a surface from wind speed, surface area, and a drag coefficient.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does wind speed matter so much in this formula?", answer: "Force scales with the square of wind speed, so doubling the wind speed quadruples the force. This is why even modest increases in wind speed during a storm can dramatically increase structural load." }, { question: "What drag coefficient should I use?", answer: "Use the flat surface preset (Cd ≈ 2.0) for signs, panels, and walls facing the wind directly; the cylindrical preset (Cd ≈ 1.2) for round poles or pipes; and the sphere preset (Cd ≈ 0.47) for round/spherical objects. For anything else, building codes and engineering references list drag coefficients for specific shapes." }, { question: "Is this accurate enough for actual construction?", answer: "No — this uses a simplified formula with fixed sea-level air density and idealized shape coefficients. Real structural wind load calculations account for gust factors, terrain exposure category, height above ground, and local building codes. Always have a licensed structural engineer verify wind loads for anything load-bearing or safety-critical." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
