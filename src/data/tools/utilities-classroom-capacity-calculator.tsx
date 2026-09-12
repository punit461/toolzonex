import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/classroom-capacity-calculator",
    navName: "Classroom Capacity Calculator",
    navDescription: "Max students by seating arrangement.",
    name: "Classroom Capacity Calculator",
    description: "Calculate the maximum recommended classroom capacity from room area and space needed per student for standard desks, lecture-style, or group table seating.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Classroom Capacity Calculator - Max Students by Room Size",
    seoDescription: "Free classroom capacity calculator. Enter room area and seating arrangement to calculate the maximum recommended number of students.",
    keywords: ["classroom capacity calculator", "max students per classroom", "classroom size calculator", "how many students fit in a classroom", "seating capacity calculator"],
    ogTitle: "Classroom Capacity Calculator - Max Students by Room Size | ToolZoneX",
    ogDescription: "Calculate the maximum recommended classroom capacity from room area and seating arrangement.",
    schemaName: "Classroom Capacity Calculator",
    schemaDescription: "Calculate the maximum recommended classroom capacity from room area and space needed per student for standard desks, lecture-style, or group table seating.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this account for fire code or legal occupancy limits?", answer: "No — this calculates a recommended educational capacity based on comfortable per-student space for learning, not fire code maximum occupancy, which is a separate legal limit set by local building and fire codes and may be higher or lower than this estimate." }, { question: "Why does group table seating need more space per student?", answer: "Group arrangements need room for shared table surfaces, chairs pulled out on multiple sides, and space for the teacher and students to move between groups — all of which adds up to more square footage per student than rows of individual desks." }, { question: "Should I subtract space for the teacher's desk or storage?", answer: "For a more accurate estimate, subtract the area used by fixed furniture, storage, or a teacher's desk from the total room area before entering it, since the per-student space guidelines assume that area is available for student seating." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
