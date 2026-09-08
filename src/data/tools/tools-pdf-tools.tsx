import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-tools",
    navName: "PDF Tools",
    navDescription: "Merge, split, rotate, watermark & convert PDFs.",
    name: "PDF Tools",
    description: "Merge, split, rotate, watermark & convert PDFs.",
    navCategory: "PDF Tools",
    shellCategory: "Finance",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Tools - Merge, Split, Rotate & Convert PDFs Free",
    seoDescription: "Free PDF tools that run entirely in your browser. Merge, split, rotate, watermark, and convert PDFs -- no upload, no signup.",
    keywords: ["pdf tools", "merge pdf", "split pdf", "convert pdf", "free pdf editor online"],
    ogTitle: "PDF Tools | ToolZoneX",
    ogDescription: "Free PDF tools that run entirely in your browser. Merge, split, rotate, watermark, and convert PDFs.",
    schemaName: undefined,
    schemaDescription: undefined,
    applicationCategory: undefined,
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: true,
};

export default tool;
