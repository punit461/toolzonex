import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-watermark-remover-simple",
    navName: "PDF Watermark Remover (Simple)",
    navDescription: "Remove watermarks added as PDF annotations.",
    name: "PDF Watermark Remover (Simple)",
    description: "Find and remove watermark or stamp annotations layered on top of a PDF's pages. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Simple PDF Watermark Remover - Remove Stamp Watermarks Free",
    seoDescription: "Free online watermark remover for PDFs. Finds and removes Stamp/Watermark annotation overlays, entirely in your browser. Doesn't remove watermarks baked into page content.",
    keywords: ["pdf watermark remover", "remove watermark from pdf", "remove pdf stamp", "delete watermark annotation", "simple watermark remover"],
    ogTitle: "PDF Watermark Remover (Simple) Online Free | ToolZoneX",
    ogDescription: "Find and remove watermark or stamp annotations layered on top of a PDF's pages.",
    schemaName: "PDF Watermark Remover Simple",
    schemaDescription: "Find and remove watermark or stamp annotations layered on top of a PDF's pages.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this remove a watermark baked into a scanned image or page content?", answer: "No — this tool only removes annotation-based overlays (Stamp or Watermark annotations). A watermark drawn directly into the page content or burned into a scanned image can't be detected or removed by this tool." }, { question: "Why does it also list \"Stamp\" annotations, not just \"Watermark\"?", answer: "Many watermarking tools use the general-purpose Stamp annotation type rather than the newer Watermark subtype, so both are shown as candidates." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
