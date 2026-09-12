import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/acceleration-calculator",
    navName: "Acceleration Calculator",
    navDescription: "Calculate acceleration, velocity & distance.",
    name: "Acceleration Calculator - Find Acceleration, Velocity & Distance",
    description: "Calculate acceleration from velocities and time, or find final velocity and distance using kinematic equations. Free online acceleration calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Acceleration Calculator - Find Acceleration, Velocity & Distance",
    seoDescription: "Free online acceleration calculator. Calculate acceleration, final velocity, or distance from kinematic equations with m/s and km/h unit toggle.",
    keywords: ["acceleration calculator", "kinematic equations", "final velocity calculator", "distance calculator", "physics calculator"],
    ogTitle: "Acceleration Calculator - Find Acceleration, Velocity & Distance | ToolZoneX",
    ogDescription: "Calculate acceleration, final velocity, or distance using kinematic equations.",
    schemaName: "Acceleration Calculator",
    schemaDescription: "Calculate acceleration, final velocity, or distance using kinematic equations.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What units does this calculator support?", answer: "You can toggle between m/s and km/h for velocity inputs. Distance is shown in meters and acceleration in m/s²." }, { question: "Can I calculate distance from just velocity and time?", answer: "Yes — switch to Distance mode and enter the initial velocity, acceleration, and time. The tool uses s = ut + 0.5at²." }, { question: "What if acceleration is negative?", answer: "A negative acceleration means deceleration. Enter a negative value as needed and the formula handles the sign automatically." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
