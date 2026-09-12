import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/occupancy-load-calculator",
    navName: "Occupancy Load Calculator",
    navDescription: "Estimated max occupancy from floor area and use type.",
    name: "Occupancy Load Calculator",
    description: "Estimate maximum occupancy load for a room or building from floor area and occupancy type, using standard reference load factors.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Occupancy Load Calculator - Max Occupancy Estimate",
    seoDescription: "Free occupancy load calculator. Enter floor area and occupancy type to estimate maximum occupant load.",
    keywords: ["occupancy load calculator", "maximum occupancy calculator", "building occupancy calculator", "occupant load factor calculator", "room capacity calculator"],
    ogTitle: "Occupancy Load Calculator - Max Occupancy Estimate | ToolZoneX",
    ogDescription: "Estimate maximum occupancy load for a room or building from floor area and occupancy type.",
    schemaName: "Occupancy Load Calculator",
    schemaDescription: "Calculate occupancy load as floor area divided by a standard occupant load factor for the selected occupancy type.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this the official, legally binding occupancy load for my building?", answer: "No. These are general reference factors intended for estimation only. Actual code-compliant occupancy load must be confirmed with your local building and fire code officials, who apply the specific code edition, exits, and use-case rules that govern your building." }, { question: "Why do occupancy factors vary so much between space types?", answer: "The factors reflect how densely people typically occupy a space for that use — a standing crowd at a concert packs in much more tightly than desks and chairs in an office, so codes assign a much smaller area-per-person figure to concentrated assembly use." }, { question: "Does this account for exits and egress requirements?", answer: "No — this only estimates occupant load from floor area and use type. Actual code compliance also requires enough exit doors, exit width, and egress path capacity to safely evacuate that many occupants, which is a separate calculation done by a code official or engineer." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
