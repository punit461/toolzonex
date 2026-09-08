import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/cft-calculator",
    navName: "CFT Calculator",
    navDescription: "Combat Fitness Test grade for defence personnel.",
    name: "CFT Calculator — Combat Fitness Test",
    description: "Calculate your Combat Fitness Test (CFT) grade for Indian Army and paramilitary forces.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MilitaryTechIcon fontSize="large" color="primary"/>,
    seoTitle: "CFT Calculator - Combat Fitness Test Standards",
    seoDescription: "Free CFT calculator to calculate combat fitness test standards. Track your military fitness progress with accurate combat fitness test assessments.",
    keywords: ["CFT calculator", "combat fitness test", "military fitness", "combat fitness standards", "army fitness", "CFT score", "combat test", "cft score table", "cft score chart", "cft score sheet"],
    ogTitle: "CFT Calculator - Combat Fitness Test | ToolZoneX",
    ogDescription: "Calculate combat fitness test standards.",
    schemaName: "CFT Calculator",
    schemaDescription: "Calculate combat fitness test standards.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Where is the CFT score chart / table?", answer: "The Standard Benchmarks section on this page is a full CFT score chart, listing the Outstanding, Good, and Average bands for the tactical march, ammo can lifts, 300m shuttle run, and casualty drag." }, { question: "How is the CFT different from the PFT?", answer: "The PFT measures general fitness (running, push-ups, sit-ups), while the CFT tests combat-specific tasks under load — tactical marching, lifting, sprinting, and casualty drags — closer to real operational demands." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
