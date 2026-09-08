import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/rotate-pdf-pages",
    navName: "Rotate Specific PDF Pages",
    navDescription: "Rotate individual pages independently.",
    name: "Rotate Specific PDF Pages",
    description: "Rotate individual pages of a PDF independently, each by its own angle, instead of rotating the whole document. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Rotate Specific PDF Pages Online Free",
    seoDescription: "Free online tool to rotate specific pages in a PDF independently, using a thumbnail grid — leave the rest of the document untouched.",
    keywords: ["rotate specific pdf pages", "rotate individual pdf pages", "rotate one page pdf", "rotate pdf page by page", "pdf page rotator"],
    ogTitle: "Rotate Specific PDF Pages Online Free | ToolZoneX",
    ogDescription: "Rotate individual pages of a PDF independently, each by its own angle.",
    schemaName: "Rotate Specific PDF Pages",
    schemaDescription: "Rotate individual pages of a PDF independently, each by its own angle.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the regular Rotate PDF tool?", answer: "Rotate PDF rotates every page in the document by the same angle. This tool lets you set a different rotation for each page individually, so you can fix just the pages that need it." }, { question: "Can I rotate a page back to its original orientation?", answer: "Yes — keep clicking rotate on that page until it reaches 0° again, or refresh and re-upload the file." }, { question: "Is my file uploaded anywhere?", answer: "No — rotation happens entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
