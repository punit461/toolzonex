import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/download-time-calculator",
    navName: "Download Time Calculator",
    navDescription: "Estimate download time from file size & speed.",
    name: "Download Time Calculator",
    description: "Estimate how long a file will take to download based on its size and your internet connection speed.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Download Time Calculator - Estimate File Download Time",
    seoDescription: "Free download time calculator to estimate how long a file will take to download based on its size in MB/GB and your internet speed in Mbps.",
    keywords: ["download time calculator", "file download time", "download speed calculator", "how long to download calculator", "mbps download time"],
    ogTitle: "Download Time Calculator - Estimate File Download Time | ToolZoneX",
    ogDescription: "Estimate how long a file will take to download based on its size and your connection speed.",
    schemaName: "Download Time Calculator",
    schemaDescription: "Estimate how long a file will take to download based on its size and internet connection speed.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why is speed in Mbps, not MB/s?", answer: "Internet plans are sold in megabits per second (Mbps). Since 1 byte = 8 bits, divide your Mbps by 8 to get megabytes per second actually transferred." }, { question: "Why is my real download slower?", answer: "Actual speeds vary with network congestion, server limits, Wi-Fi overhead, and overhead protocols — this is a best-case estimate at the stated speed." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
