import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/horsepower-calculator",
    navName: "Horsepower Calculator",
    navDescription: "Calculate horsepower from torque and RPM.",
    name: "Horsepower Calculator - Torque & RPM to HP",
    description: "Calculate horsepower from torque and RPM, in imperial (lb-ft) or metric (N·m) units.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Horsepower Calculator - Torque & RPM to HP",
    seoDescription: "Free horsepower calculator. Enter torque and RPM to calculate horsepower using HP = torque × RPM ÷ 5252 (imperial) or the metric equivalent.",
    keywords: ["horsepower calculator", "torque to horsepower calculator", "hp calculator", "rpm to horsepower calculator", "torque rpm calculator"],
    ogTitle: "Horsepower Calculator | ToolZoneX",
    ogDescription: "Calculate horsepower from torque and RPM.",
    schemaName: "Horsepower Calculator",
    schemaDescription: "Calculate horsepower from torque and RPM, in imperial (lb-ft) or metric (N·m) units.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Where does the constant 5,252 come from?", answer: "It comes from converting the definition of mechanical power (torque × angular velocity) into horsepower and RPM units — specifically, 33,000 ft-lb/min per horsepower divided by 2π radians per revolution equals approximately 5,252. It's also the RPM at which the torque (in lb-ft) and horsepower numbers are always identical on a dyno graph." }, { question: "Should I use imperial or metric units?", answer: "Use imperial (pound-feet) if your torque figure comes from a US-spec source, and metric (newton-meters) if it comes from a manufacturer spec sheet using SI units — the calculator applies the matching conversion constant for whichever you select." }, { question: "Does this account for drivetrain losses?", answer: "No — this calculates horsepower directly from the torque and RPM figures you enter (typically crank/engine output). Power actually delivered to the wheels is usually 15-20% lower after accounting for drivetrain losses through the transmission and differential." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
