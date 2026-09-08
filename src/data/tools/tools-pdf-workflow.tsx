import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-workflow",
    navName: "PDF Workflow Builder",
    navDescription: "Chain two PDF operations together.",
    name: "PDF Workflow Builder",
    description: "Chain two PDF operations — Merge, Compress, Rotate, Watermark, or Extract Pages — into one run. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Workflow Builder - Chain PDF Operations Online Free",
    seoDescription: "Free online PDF workflow tool. Chain two operations — merge, compress, rotate, watermark, or extract pages — and download the final result in one go.",
    keywords: ["pdf workflow", "chain pdf operations", "pdf automation online", "multi step pdf tool", "pdf batch operations"],
    ogTitle: "PDF Workflow Builder Online Free | ToolZoneX",
    ogDescription: "Chain two PDF operations into one run and download the final result.",
    schemaName: "PDF Workflow Builder",
    schemaDescription: "Chain two PDF operations — Merge, Compress, Rotate, Watermark, or Extract Pages — into one run.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I chain more than two steps?", answer: "Not in this tool — it's intentionally limited to a two-step chain. For longer chains, download the Step 1+2 result and run it through this tool (or another PDF tool) again." }, { question: "Does this support password-protected PDFs?", answer: "No — to keep the chained workflow simple, this tool expects unencrypted PDFs. Unlock a password-protected file with the Unlock PDF tool first." }, { question: "Is my file uploaded anywhere?", answer: "No — both steps run entirely in your browser; files are never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
