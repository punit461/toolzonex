import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/compress-pdf",
    navName: "Compress PDF",
    navDescription: "Shrink a PDF's file size.",
    name: "Compress PDF - Reduce PDF File Size",
    description: "Shrink a PDF's file size with lossless compression, or a stronger lossy mode for scanned and image-heavy PDFs. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Compress PDF - Reduce PDF File Size Online Free",
    seoDescription: "Free online PDF compressor. Shrink a PDF's file size with lossless compression, or a stronger lossy mode for scanned and image-heavy PDFs.",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "pdf compressor", "make pdf smaller"],
    ogTitle: "Compress PDF - Reduce PDF File Size Online Free | ToolZoneX",
    ogDescription: "Shrink a PDF's file size with lossless compression, or a stronger lossy mode for scanned and image-heavy PDFs.",
    schemaName: "Compress PDF",
    schemaDescription: "Reduce a PDF's file size using lossless object-stream compression, with an optional lossy image-based mode for scanned or image-heavy PDFs.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will standard compression change how my PDF looks?", answer: "No — it's lossless. It only re-organizes the file's internal data more efficiently, so every page renders identically." }, { question: "What does strong compression change?", answer: "It redraws every page as a compressed JPEG image, similar to what most free online PDF compressors do for image-heavy files. This gives a much smaller file, but any selectable text becomes part of the image and can no longer be selected, searched, or copied." }, { question: "Is my file uploaded anywhere?", answer: "No — compression happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
