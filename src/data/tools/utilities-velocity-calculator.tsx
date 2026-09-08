import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/velocity-calculator",
    navName: "Velocity Calculator",
    navDescription: "Solve for velocity, distance, or time.",
    name: "Velocity Calculator - Solve for Velocity, Distance, or Time",
    description: "Calculate velocity from distance and time, or solve for distance or time given the other two variables.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Velocity Calculator - Solve for Velocity, Distance, or Time",
    seoDescription: "Free velocity calculator. Enter any two of distance, time, or velocity to solve for the third using v = d/t.",
    keywords: ["velocity calculator", "distance time velocity calculator", "speed distance time calculator", "solve for velocity", "physics velocity calculator"],
    ogTitle: "Velocity Calculator - Solve for Velocity, Distance, or Time | ToolZoneX",
    ogDescription: "Calculate velocity, distance, or time from the other two known values.",
    schemaName: "Velocity Calculator",
    schemaDescription: "Calculate velocity from distance and time, or solve for distance or time given the other two variables.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between speed and velocity?", answer: "Speed is a scalar quantity describing how fast something moves, while velocity is a vector that also includes direction. For straight-line calculations like this one, the numeric result is the same either way — only the interpretation differs." }, { question: "Can I use any units for distance and time?", answer: "Yes — the calculator performs pure division and multiplication, so as long as you're consistent (e.g., meters and seconds, or miles and hours), the result will be in the matching unit (meters per second, miles per hour, and so on)." }, { question: "What if time is zero?", answer: "Velocity is undefined when time is zero, since you can't divide by zero. Enter a non-zero time value to get a valid result when solving for velocity or time." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
