import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/potential-energy-calculator",
    navName: "Potential Energy Calculator",
    navDescription: "Calculate gravitational potential energy.",
    name: "Potential Energy Calculator",
    description: "Calculate gravitational potential energy from mass, height, and gravity — and solve for any one of the three.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Potential Energy Calculator - Gravitational PE = mgh",
    seoDescription: "Free potential energy calculator. Calculate gravitational potential energy (PE = mgh) and solve for mass, height, or energy given the other two.",
    keywords: ["potential energy calculator", "gravitational potential energy calculator", "pe = mgh calculator", "potential energy formula calculator", "physics potential energy"],
    ogTitle: "Potential Energy Calculator - Gravitational PE = mgh | ToolZoneX",
    ogDescription: "Calculate gravitational potential energy or solve for mass or height.",
    schemaName: "Potential Energy Calculator",
    schemaDescription: "Calculate gravitational potential energy from mass, height, and gravity, solving for any one of the three variables.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why is gravity adjustable?", answer: "Earth's standard gravity (9.8 m/s², sometimes rounded to 9.81) is the default, but gravitational acceleration differs elsewhere — about 1.62 m/s² on the Moon and 3.71 m/s² on Mars — so making it adjustable lets you calculate potential energy anywhere." }, { question: "What reference point does height use?", answer: "Height is measured relative to whatever reference point you choose, such as the ground or a table surface — potential energy is always relative, so what matters is the height difference between the object's position and that reference point." }, { question: "How is this related to kinetic energy?", answer: "As an object falls, its potential energy converts into kinetic energy. Ignoring air resistance, the potential energy lost equals the kinetic energy gained, which is the basis of the conservation of mechanical energy in physics." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
