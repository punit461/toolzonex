import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-to-xml",
    navName: "PDF to XML",
    navDescription: "Convert a PDF to XML format.",
    name: "PDF to XML Converter - Convert PDF to XML Online",
    description: "Extract text from a PDF and convert it to well-formed XML format. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF to XML Converter - Convert PDF to XML Online",
    seoDescription: "Free online PDF to XML converter. Extract text from a PDF and convert it to well-structured XML format with per-page tags.",
    keywords: ["pdf to xml", "convert pdf to xml", "pdf xml converter", "extract xml from pdf"],
    ogTitle: "PDF to XML Converter - Convert PDF to XML Online | ToolZoneX",
    ogDescription: "Extract text from a PDF and convert it to well-formed XML format. Free, private, runs entirely in your browser.",
    schemaName: "PDF to XML Converter",
    schemaDescription: "Extract text from a PDF and convert it to well-formed XML format.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this preserve images or formatting?", answer: "No — only the text layer is extracted. Images, tables, and visual styling are not included in the XML output." }, { question: "Will the XML be valid?", answer: "Yes — the output follows a well-formed XML structure with a proper declaration, root document element, and one page element per PDF page." }, { question: "Is my file uploaded anywhere?", answer: "No — conversion happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
