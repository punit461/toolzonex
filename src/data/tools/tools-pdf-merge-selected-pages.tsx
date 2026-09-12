import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-merge-selected-pages",
    navName: "Merge Selected PDF Pages",
    navDescription: "Merge specific pages from multiple PDFs.",
    name: "Merge Selected PDF Pages",
    description: "Merge only the pages you choose from multiple PDF files into one document. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Merge Selected PDF Pages Online Free",
    seoDescription: "Free online tool to merge specific pages from several PDF files into one document. Pick which pages from each file to include.",
    keywords: ["merge selected pdf pages", "merge specific pages pdf", "combine pdf pages", "pdf page merger", "merge pdf by page range"],
    ogTitle: "Merge Selected PDF Pages Online Free | ToolZoneX",
    ogDescription: "Merge only the pages you choose from multiple PDF files into one document.",
    schemaName: "Merge Selected PDF Pages",
    schemaDescription: "Merge only the pages you choose from multiple PDF files into one document.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from Merge PDF?", answer: "The regular Merge PDF tool combines every page of every file. This tool lets you pick specific pages (or ranges) from each file before merging." }, { question: "What happens if I leave a file's page range blank?", answer: "All of that file's pages are included, same as a normal merge." }, { question: "Is my file uploaded anywhere?", answer: "No — merging happens entirely in your browser; files are never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
