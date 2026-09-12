import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/room-perimeter-calculator",
    navName: "Room Perimeter Calculator",
    navDescription: "Perimeter from room length and width, or wall segments.",
    name: "Room Perimeter Calculator - Rectangular & Irregular Rooms",
    description: "Calculate a room's perimeter from length and width, or sum wall segment lengths for an irregular room shape.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "Room Perimeter Calculator - Rectangular & Irregular Rooms",
    seoDescription: "Free room perimeter calculator. Enter length and width for a rectangular room, or add wall segments for an irregular room shape.",
    keywords: ["room perimeter calculator", "perimeter of a room", "baseboard calculator", "irregular room perimeter", "trim length calculator"],
    ogTitle: "Room Perimeter Calculator - Rectangular & Irregular Rooms | ToolZoneX",
    ogDescription: "Calculate a room's perimeter from length and width, or sum wall segment lengths for an irregular shape.",
    schemaName: "Room Perimeter Calculator",
    schemaDescription: "Calculate a room's perimeter from length and width, or sum wall segment lengths for an irregular room shape.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Should I subtract doorways and openings from the perimeter?", answer: "For baseboard or trim, yes — subtract the width of any doorways or open archways, since trim isn't installed across an opening. This tool gives the full wall perimeter; deduct openings separately for an exact material order." }, { question: "How do I measure an irregular room?", answer: "Walk the room's perimeter and measure each straight wall segment one at a time, in order, then enter each length as its own row in Irregular Room mode. The tool sums every segment into a total perimeter." }, { question: "Does this calculate floor area too?", answer: "In Rectangle mode, yes — the area (length × width) is shown alongside the perimeter. Irregular mode only totals the perimeter, since area for a non-rectangular shape needs more than just the outer wall lengths." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
