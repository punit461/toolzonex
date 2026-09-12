import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/upload-time-calculator",
    navName: "Upload Time Calculator",
    navDescription: "Estimate upload time from file size & speed.",
    name: "Upload Time Calculator",
    description: "Estimate how long a file will take to upload based on its size and your connection's upload speed, or find the speed needed to hit a target time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CloudUploadIcon fontSize="large" color="primary"/>,
    seoTitle: "Upload Time Calculator - Estimate File Upload Time",
    seoDescription: "Free upload time calculator to estimate how long a file will take to upload based on its size in MB/GB and your upload speed in Mbps.",
    keywords: ["upload time calculator", "file upload time", "upload speed calculator", "how long to upload calculator", "mbps upload time"],
    ogTitle: "Upload Time Calculator - Estimate File Upload Time | ToolZoneX",
    ogDescription: "Estimate how long a file will take to upload based on its size and your connection speed.",
    schemaName: "Upload Time Calculator",
    schemaDescription: "Estimate how long a file will take to upload based on its size and upload connection speed, or the speed required for a target time.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why is my upload speed slower than my download speed?", answer: "Most consumer internet plans (especially cable and DSL) are asymmetric, meaning they allocate much more bandwidth to downloads than uploads since most home usage is download-heavy. Fiber connections are more likely to offer symmetric upload and download speeds." }, { question: "Why is my actual upload slower than this estimate?", answer: "This is a best-case estimate at your stated speed. Real uploads are also affected by network congestion, the destination server's upload limits, Wi-Fi overhead, and other devices sharing your connection at the same time." }, { question: "Why is speed measured in Mbps, not MB/s?", answer: "Internet plans are advertised in megabits per second (Mbps). Since 1 byte equals 8 bits, divide your Mbps figure by 8 to estimate the actual megabytes transferred per second." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
