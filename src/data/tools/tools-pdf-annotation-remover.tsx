import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-annotation-remover",
    navName: "PDF Annotation Remover",
    navDescription: "Strip all comments and annotations from a PDF.",
    name: "PDF Annotation Remover - Remove Comments from PDF Online",
    description: "Remove all annotations — comments, highlights, stamps, and notes — from every page of a PDF. Shows the count of annotations removed. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Annotation Remover - Remove Comments from PDF Online",
    seoDescription: "Remove all annotations, comments, highlights, and stamps from a PDF. Free online tool.",
    keywords: ["remove pdf annotations", "delete pdf comments", "pdf annotation remover", "strip pdf notes", "remove comments from pdf", "delete annotations pdf", "pdf comment remover", "strip annotations from pdf", "remove highlights from pdf", "pdf annotation cleaner", "remove stamps from pdf", "delete notes from pdf", "pdf annotation remover tool", "clean pdf annotations", "remove all annotations pdf", "strip comments from pdf online", "delete pdf annotations online free", "pdf annotation remover online free", "remove comments highlights pdf", "strip pdf annotations free", "how to remove annotations from pdf", "remove pdf notes online", "pdf annotation stripper", "clean pdf comments online", "delete annotations from pdf online", "remove all comments from pdf free"],
    ogTitle: "PDF Annotation Remover - Remove Comments from PDF Online | ToolZoneX",
    ogDescription: "Remove all annotations, comments, highlights, and stamps from a PDF. Free, private, runs in your browser.",
    schemaName: "PDF Annotation Remover",
    schemaDescription: "Remove all annotations — comments, highlights, stamps, and notes — from every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this remove form fields?", answer: "No — only annotations (comments, highlights, stamps) are removed. Use the Flatten PDF tool for form fields." }, { question: "What types of annotations are removed?", answer: "All annotation types including text notes, highlights, underlines, stamps, freehand drawings, and more." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens locally in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
