import StorageIcon from '@mui/icons-material/Storage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/file-compression-ratio-calculator",
    navName: "File Compression Ratio Calculator",
    navDescription: "Compression ratio & space saved for files.",
    name: "File Compression Ratio Calculator",
    description: "Calculate a file's compression ratio and percentage of space saved from its original and compressed sizes.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <StorageIcon fontSize="large" color="primary"/>,
    seoTitle: "File Compression Ratio Calculator - Space Saved %",
    seoDescription: "Free file compression ratio calculator. Enter original and compressed file size to calculate compression ratio and space saved.",
    keywords: ["file compression ratio calculator", "compression ratio calculator files", "space saved calculator", "zip compression ratio calculator", "data compression ratio"],
    ogTitle: "File Compression Ratio Calculator - Space Saved % | ToolZoneX",
    ogDescription: "Calculate a file's compression ratio and percentage of space saved.",
    schemaName: "File Compression Ratio Calculator",
    schemaDescription: "Calculate a file's compression ratio and percentage of space saved from its original and compressed sizes.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this the same as the Compression Ratio Calculator already on this site?", answer: "No — that calculator computes an engine's compression ratio from cylinder bore, stroke, and combustion chamber volume, an entirely different automotive/mechanical concept that just happens to share a similar name. This calculator is about data and file compression — zip archives, images, video, and similar." }, { question: "What's a good compression ratio?", answer: "It depends heavily on the file type and format — text and uncompressed formats often compress 3:1 to 10:1 or more, while already-compressed formats like JPEG images or MP4 videos typically see much smaller further gains since most of the redundancy is already removed." }, { question: "Does a higher compression ratio always mean better compression?", answer: "Not necessarily on its own — very high ratios on lossy formats (like images or video) can come at the cost of visible quality loss, so it's worth weighing compression ratio against acceptable quality for your use case." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
