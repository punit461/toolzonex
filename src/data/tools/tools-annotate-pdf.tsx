import NoteAltIcon from '@mui/icons-material/NoteAlt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/annotate-pdf",
    navName: "Annotate PDF",
    navDescription: "Add text annotations and notes to PDF pages.",
    name: "Annotate PDF",
    description: "Add text annotations, notes, and comments directly onto PDF pages at any position.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <NoteAltIcon fontSize="large" color="primary"/>,
    seoTitle: "Annotate PDF Online Free - Add Notes to PDF",
    seoDescription: "Free online tool to annotate PDFs — add text notes, comments, and labels at any position on any page. Runs entirely in your browser.",
    keywords: ["annotate pdf", "add notes to pdf", "pdf annotation tool", "pdf comments"],
    ogTitle: "Annotate PDF Online Free - Add Notes to PDF | ToolZoneX",
    ogDescription: "Free online tool to annotate PDFs — add text notes, comments, and labels at any position.",
    schemaName: "Annotate PDF",
    schemaDescription: "Add text annotations, notes, and comments directly onto PDF pages.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What coordinate system is used for positioning?", answer: "PDF points start at (0, 0) from the bottom-left corner of the page. A standard A4 page is roughly 595 × 842 points." }, { question: "Can I add multiple annotations?", answer: "Currently one annotation per operation. Repeat the process to add more notes at different positions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
