import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/image-compressor",
    navName: "Image Compressor",
    navDescription: "Compress images with quality presets and before/after stats.",
    name: "Image Compressor Online - Compress Images Free",
    description: "Compress JPG and PNG images online for free. Choose a quality preset or use a custom slider. Shows before/after file size and compression ratio. Runs entirely in your browser.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "Image Compressor Online - Compress Images Free",
    seoDescription: "Compress images online for free with quality presets and before/after file size comparison. JPG and PNG supported. No uploads.",
    keywords: ["image compressor", "compress image online", "reduce image size", "photo compressor"],
    ogTitle: "Image Compressor Online - Compress Images Free | ToolZoneX",
    ogDescription: "Compress images online for free with quality presets and before/after stats. No uploads.",
    schemaName: "Image Compressor Online",
    schemaDescription: "Compress images with quality presets and before/after stats.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What quality level should I use?", answer: "Medium (60%) is a good default — it saves ~80% of file size with minimal visible change. Use High (85%) for images where every detail matters, and Low (30%) when smallest size is the priority." }, { question: "Does this support PNG?", answer: "PNG uses lossless compression, so the quality slider has less effect. For PNGs, the tool still reduces the output size by re-encoding." }, { question: "Is my image uploaded anywhere?", answer: "No — compression happens entirely in your browser using the canvas API." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
