import MemoryIcon from '@mui/icons-material/Memory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/memory-card-capacity-calculator",
    navName: "Memory Card Capacity Calculator",
    navDescription: "Photos or video minutes that fit on a card.",
    name: "Memory Card Capacity Calculator",
    description: "Calculate approximately how many photos or minutes of video fit on a memory card based on capacity and file type/quality preset.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MemoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Memory Card Capacity Calculator - Photos & Video Minutes",
    seoDescription: "Free memory card capacity calculator. Enter card size and file type to calculate how many photos or minutes of video fit on the card.",
    keywords: ["memory card capacity calculator", "sd card capacity calculator", "how many photos fit on a memory card", "how many minutes of 4k video on sd card", "memory card storage calculator"],
    ogTitle: "Memory Card Capacity Calculator - Photos & Video Minutes | ToolZoneX",
    ogDescription: "Calculate how many photos or minutes of video fit on a memory card based on capacity and file type.",
    schemaName: "Memory Card Capacity Calculator",
    schemaDescription: "Calculate capacity as card size in megabytes divided by the average file size in megabytes for the selected file type/quality preset.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Are these file sizes exact for my camera?", answer: "No — actual file sizes vary by camera model, sensor resolution, compression settings, bitrate, and scene complexity. These are illustrative average figures meant to give a reasonable ballpark estimate, not an exact count." }, { question: "Why does RAW take up so much more space than JPEG?", answer: "RAW files store nearly all the sensor's unprocessed data with little to no compression, preserving maximum editing flexibility, while JPEG applies lossy compression that discards data to shrink the file significantly." }, { question: "Does higher video bitrate or frame rate change the file size?", answer: "Yes significantly — a higher bitrate or frame rate setting increases the data recorded per minute, which would raise the average file size beyond the illustrative figure used here. Check your camera's actual bitrate specs for a more precise per-minute estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
