import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/compare-two-pdfs",
    navName: "Compare Two PDFs",
    navDescription: "Compare two PDF files side by side.",
    name: "Compare Two PDFs Online Free",
    description: "Compare two PDF files side by side — see page count differences, text similarity, and a list of page-level changes. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Compare Two PDFs Online Free",
    seoDescription: "Free online tool to compare two PDF files. See page count differences, text similarity percentage, and page-level content changes.",
    keywords: ["compare pdfs", "compare two pdf files", "pdf comparison tool", "diff pdf"],
    ogTitle: "Compare Two PDFs Online Free | ToolZoneX",
    ogDescription: "Compare two PDF files side by side — see page count differences, text similarity, and a list of page-level changes.",
    schemaName: "Compare Two PDFs",
    schemaDescription: "Compare two PDF files side by side for differences.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this compare images or formatting?", answer: "No — the comparison is based on the text layer only. Visual differences such as fonts, images, and layout are not detected." }, { question: "How is similarity calculated?", answer: "Word-by-word matching across both files produces a percentage of matching words relative to the total word count of both documents." }, { question: "Is my file uploaded anywhere?", answer: "No — both files are processed entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
