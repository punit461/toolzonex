import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-font-viewer",
    navName: "PDF Font Viewer",
    navDescription: "Check what fonts are used in a PDF.",
    name: "PDF Font Viewer",
    description: "Check what fonts are embedded or referenced in a PDF file. See font names, types, and where they appear. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Font Viewer - Check PDF Embedded Fonts Online",
    seoDescription: "Free online PDF font viewer. Check what fonts are embedded or referenced in any PDF. See font names, types, and first page of use.",
    keywords: ["pdf fonts", "check pdf fonts", "pdf embedded fonts", "pdf font viewer", "pdf typeface", "pdf font list"],
    ogTitle: "PDF Font Viewer - Check PDF Embedded Fonts Online | ToolZoneX",
    ogDescription: "Check what fonts are embedded or referenced in any PDF file. See font names, types, and where they appear.",
    schemaName: "PDF Font Viewer",
    schemaDescription: "Check what fonts are embedded or referenced in a PDF file.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Will this show every font in the PDF?", answer: "It shows fonts declared in page resource dictionaries and form field appearances. Some PDFs embed fonts in non-standard ways that may not be detected." }, { question: "What is the difference between TrueType and Type1 fonts?", answer: "TrueType was developed by Apple and Microsoft, Type1 by Adobe. Both are outline font formats that render text clearly at any size — they are just different encoding standards." }, { question: "Is my file uploaded anywhere?", answer: "No — font extraction runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
