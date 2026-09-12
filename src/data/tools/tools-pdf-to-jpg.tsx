import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-jpg",
    navName: "PDF to JPG",
    navDescription: "Convert PDF pages to JPG images.",
    name: "PDF to JPG Converter - Convert PDF to JPG Online Free",
    description: "Convert every page of a PDF into a JPG image with adjustable JPEG quality. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to JPG Converter - Convert PDF to JPG Online Free",
    seoDescription: "Convert every page of a PDF into a JPG image. Adjust JPEG quality to balance sharpness and file size.",
    keywords: ["pdf to jpg", "convert pdf to jpg", "pdf jpeg converter", "export pdf as jpg"],
    ogTitle: "PDF to JPG Converter - Convert PDF to JPG Online Free | ToolZoneX",
    ogDescription: "Convert every page of a PDF into a JPG image with adjustable JPEG quality.",
    schemaName: "PDF to JPG",
    schemaDescription: "Convert every page of a PDF into a JPG image with adjustable JPEG quality.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What quality level should I use?", answer: "80–90% works well for most purposes. Use 100% for archival quality or 50–60% when file size is the priority." }, { question: "Does this support color and grayscale PDFs?", answer: "Yes — both color and grayscale pages are exported faithfully as JPG images." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
