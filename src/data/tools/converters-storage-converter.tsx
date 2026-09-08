import StorageIcon from '@mui/icons-material/Storage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/storage-converter",
    navName: "Storage Converter",
    navDescription: "Convert bits, bytes, KB, MB, GB, TB & PB.",
    name: "Storage Converter - Bits, Bytes, KB, MB, GB, TB & PB",
    description: "Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes using the binary (1024-based) convention.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <StorageIcon fontSize="large" color="primary"/>,
    seoTitle: "Storage Converter - Bits, Bytes, KB, MB, GB, TB & PB",
    seoDescription: "Free digital storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
    keywords: ["storage converter", "data storage converter", "bytes to gb converter", "mb to gb converter", "digital storage calculator", "kb mb gb tb converter"],
    ogTitle: "Storage Converter - Bits, Bytes, KB, MB, GB, TB & PB | ToolZoneX",
    ogDescription: "Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes instantly.",
    schemaName: "Storage Converter",
    schemaDescription: "Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes using the binary (1024-based) convention.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does my 1TB hard drive show less than 1,000GB of space?", answer: "Manufacturers advertise capacity using the decimal convention (1TB = 1,000,000,000,000 bytes), but your operating system reports it using the binary convention this calculator uses (1TB ≈ 1,099,511,627,776 bytes) — the same physical bytes, just measured with a different-sized \"GB.\"" }, { question: "What's the difference between a bit and a byte?", answer: "A byte is 8 bits. Internet connection speeds are almost always advertised in bits per second (Mbps), while file sizes are almost always shown in bytes (MB) — dividing a download's megabit speed by 8 gives you the expected megabyte-per-second transfer rate." }, { question: "Are KiB, MiB, and GiB the same as this tool's KB, MB, and GB?", answer: "Yes in value — KiB/MiB/GiB are the technically precise IEC names for binary (1,024-based) units. This tool uses the more commonly searched KB/MB/GB labels but calculates them using the binary convention those IEC units represent." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
