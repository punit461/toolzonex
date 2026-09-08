import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-booklet-creator",
    navName: "PDF Booklet Creator",
    navDescription: "Arrange pages for booklet printing.",
    name: "PDF Booklet Creator - Create Print-Ready Booklets Online",
    description: "Rearrange a PDF's pages in booklet printing order for saddle-stitch binding. Automatically adds a blank page for odd page counts. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Booklet Creator - Create Print-Ready Booklets Online",
    seoDescription: "Rearrange a PDF's pages in booklet printing order for saddle-stitch binding. Automatically adds a blank page for odd page counts.",
    keywords: ["pdf booklet", "booklet creator pdf", "pdf booklet maker", "print booklet pdf"],
    ogTitle: "PDF Booklet Creator - Create Print-Ready Booklets Online | ToolZoneX",
    ogDescription: "Rearrange a PDF's pages in booklet printing order for saddle-stitch binding.",
    schemaName: "PDF Booklet Creator",
    schemaDescription: "Rearrange a PDF's pages in booklet printing order for saddle-stitch binding.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if my page count is odd?", answer: "A blank page is automatically added at the end so that every sheet has content on both sides." }, { question: "Do I need special software to print?", answer: "No — open the booklet PDF, select \"Print on Both Sides\" (flip on short edge), and fold the printed stack in half." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
