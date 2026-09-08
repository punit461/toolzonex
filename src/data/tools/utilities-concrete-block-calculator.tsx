import ConstructionIcon from '@mui/icons-material/Construction';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/concrete-block-calculator",
    navName: "Concrete Block Calculator",
    navDescription: "How many cinder blocks & mortar bags for a wall.",
    name: "Concrete Block Calculator",
    description: "Calculate how many concrete blocks (cinder blocks) and mortar bags you need for a wall from its length and height.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ConstructionIcon fontSize="large" color="primary"/>,
    seoTitle: "Concrete Block Calculator - Cinder Blocks & Mortar Needed",
    seoDescription: "Free concrete block calculator. Enter wall dimensions and block size to find how many cinder blocks and mortar bags your wall project needs.",
    keywords: ["concrete block calculator", "cinder block calculator", "block wall calculator", "how many blocks do i need", "mortar bags calculator"],
    ogTitle: "Concrete Block Calculator - Cinder Blocks & Mortar Needed | ToolZoneX",
    ogDescription: "Calculate how many concrete blocks and mortar bags a wall project needs.",
    schemaName: "Concrete Block Calculator",
    schemaDescription: "Calculate how many concrete blocks and mortar bags are needed for a wall from its length, height, and block size.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the site's Concrete Calculator?", answer: "The Concrete Calculator and Concrete Slab Calculator are for poured or mixed concrete — they calculate wet concrete volume and cement bags for slabs, footings, and columns. This tool is specifically for concrete block (cinder block) construction, where you're counting individual masonry units and mortar for a block wall, not pouring a volume of concrete." }, { question: "What's a standard concrete block size?", answer: "The most common standard block is nominally 16\" long × 8\" high × 8\" deep, though the actual block is slightly smaller (about 15⅝\" × 7⅝\") to allow for a 3/8\" mortar joint on each side, which is why this calculator adds the joint back in when sizing the effective coverage area." }, { question: "How much waste should I allow for?", answer: "A 5-10% allowance is typical to cover cut blocks at corners and openings, plus breakage during handling. Complex layouts with lots of openings or corners may need a higher allowance." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
