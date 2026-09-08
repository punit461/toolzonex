import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/speaker-distance-calculator",
    navName: "Speaker Distance Calculator",
    navDescription: "Stereo speaker placement using the triangle rule.",
    name: "Speaker Distance Calculator",
    description: "Calculate recommended stereo speaker spacing and toe-in angle using the equilateral triangle placement rule.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GraphicEqIcon fontSize="large" color="primary"/>,
    seoTitle: "Speaker Distance Calculator - Stereo Speaker Placement",
    seoDescription: "Free speaker distance calculator. Enter listening distance to find recommended speaker spacing and toe-in angle.",
    keywords: ["speaker distance calculator", "stereo speaker placement calculator", "equilateral triangle speaker setup", "speaker toe-in calculator", "speaker spacing calculator"],
    ogTitle: "Speaker Distance Calculator - Stereo Speaker Placement | ToolZoneX",
    ogDescription: "Calculate recommended stereo speaker spacing and toe-in angle using the equilateral triangle rule.",
    schemaName: "Speaker Distance Calculator",
    schemaDescription: "Calculate recommended stereo speaker spacing and toe-in angle using the equilateral triangle placement rule.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is the equilateral triangle rule a strict requirement?", answer: "No — it's a well-established starting guideline, not a strict rule. Room acoustics, furniture, wall reflections, and speaker design all affect the ideal placement, so treat this as a solid baseline to fine-tune from by ear." }, { question: "Why angle the speakers inward at all?", answer: "Toe-in aims each speaker's most direct, focused sound at the listening position rather than letting it fire straight ahead past the listener, which typically sharpens stereo imaging and center-channel focus for near-field and mid-field listening distances." }, { question: "Does this work for all room sizes?", answer: "The equilateral triangle scales with any listening distance, but very small rooms may need to compromise on exact spacing due to walls and furniture, and very large rooms may benefit from slightly wider spacing than a strict equilateral triangle to fill the space." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
