import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/internet-speed-calculator",
    navName: "Internet Speed Calculator",
    navDescription: "Estimate download/upload time or required speed.",
    name: "Internet Speed Calculator - Download Time Estimator",
    description: "Estimate download or upload time from file size and connection speed, or find the speed needed to hit a target time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <NetworkCheckIcon fontSize="large" color="primary"/>,
    seoTitle: "Internet Speed Calculator - Download Time Estimator",
    seoDescription: "Free internet speed calculator. Estimate how long a download or upload will take, or find the connection speed needed to meet a deadline.",
    keywords: ["internet speed calculator", "download time calculator", "file transfer time calculator", "mbps to download time", "upload time calculator"],
    ogTitle: "Internet Speed Calculator - Download Time Estimator | ToolZoneX",
    ogDescription: "Estimate download/upload time from file size and connection speed.",
    schemaName: "Internet Speed Calculator",
    schemaDescription: "Estimate download or upload time from file size and connection speed, or find the speed needed to hit a target time.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is my actual download slower than this estimate?", answer: "This calculator assumes you get the full advertised speed with no overhead. In practice, protocol overhead, server-side bandwidth limits, Wi-Fi conditions, and other devices sharing your connection all reduce real-world throughput below the theoretical maximum." }, { question: "Why do file sizes and speeds use different units (bytes vs. bits)?", answer: "It's a long-standing convention: storage (file sizes) is measured in bytes, while network speeds are measured in bits per second. Since 1 byte = 8 bits, a \"100 Mbps\" connection transfers at most 12.5 megabytes per second, not 100 megabytes per second." }, { question: "What speed do I need to download a file in a specific time?", answer: "Switch to \"Required Speed\" mode, enter the file size and your desired completion time, and the calculator returns the minimum connection speed (in Mbps) needed to meet that deadline." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
