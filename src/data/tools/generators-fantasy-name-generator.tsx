import FaceIcon from '@mui/icons-material/Face';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/fantasy-name-generator",
    navName: "Fantasy Name Generator",
    navDescription: "Generate names for fantasy characters.",
    name: "Fantasy Name Generator",
    description: "Create fantasy character names for elves, dwarves, humans, orcs, and dragonborn. Free online fantasy name generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Fantasy Name Generator - Elf, Dwarf, Orc & Dragon Names",
    seoDescription: "Generate 10 fantasy character names at once for elves, dwarves, humans, orcs, and dragonborn. Free online fantasy name generator.",
    keywords: ["fantasy name generator", "fantasy names", "elf names", "dwarf names", "orc names", "dragon names", "character name generator"],
    ogTitle: "Fantasy Name Generator - Elf, Dwarf, Orc & Dragon Names | ToolZoneX",
    ogDescription: "Generate fantasy names for elves, dwarves, humans, orcs, and dragonborn.",
    schemaName: "Fantasy Name Generator",
    schemaDescription: "Generate fantasy character names for elves, dwarves, humans, orcs, and dragonborn.",
    applicationCategory: "GameApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
