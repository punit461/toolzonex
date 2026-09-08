import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/repair-pdf",
    navName: "Repair PDF",
    navDescription: "Recover a corrupt or malformed PDF's structure.",
    name: "Repair PDF",
    description: "Attempt to fix a corrupt or malformed PDF by parsing it leniently and re-saving it with a clean structure. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Repair PDF - Fix a Corrupt or Damaged PDF Online Free",
    seoDescription: "Free online PDF repair tool. Recover a corrupt or malformed PDF by parsing it leniently and re-saving it with a clean structure, entirely in your browser.",
    keywords: ["repair pdf", "fix corrupt pdf", "pdf repair tool online", "recover damaged pdf", "fix broken pdf free"],
    ogTitle: "Repair PDF Online Free | ToolZoneX",
    ogDescription: "Attempt to fix a corrupt or malformed PDF by parsing it leniently and re-saving it with a clean structure.",
    schemaName: "Repair PDF",
    schemaDescription: "Attempt to fix a corrupt or malformed PDF by parsing it leniently and re-saving it with a clean structure.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can this fix any corrupted PDF?", answer: "No. It recovers files with minor structural issues that a lenient parser can still make sense of. If the core structure is too badly damaged, the parser itself will fail and the tool will tell you it couldn't recover the file." }, { question: "Will this fix visual corruption, like garbled text or missing images?", answer: "No — this tool repairs the PDF's underlying object structure, not rendering issues caused by missing fonts or damaged image streams inside an otherwise valid file." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
