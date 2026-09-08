import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-ink-saver",
    navName: "PDF Ink Saver",
    navDescription: "Lighten a PDF to use less ink or toner when printing.",
    name: "PDF Ink Saver",
    description: "Reduce ink and toner usage when printing a PDF via grayscale conversion and an adjustable lightening slider. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Ink Saver - Reduce Ink Usage When Printing Free",
    seoDescription: "Free online PDF ink saver. Convert to grayscale and lighten pages to cut ink and toner usage when printing, entirely in your browser.",
    keywords: ["pdf ink saver", "save ink printing pdf", "toner saver pdf", "lighten pdf for printing", "eco print pdf"],
    ogTitle: "PDF Ink Saver Online Free | ToolZoneX",
    ogDescription: "Reduce ink and toner usage when printing a PDF via grayscale conversion and an adjustable lightening slider.",
    schemaName: "PDF Ink Saver",
    schemaDescription: "Reduce ink and toner usage when printing a PDF via grayscale conversion and an adjustable lightening slider.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this actually reduce a printer's ink consumption?", answer: "Yes, in the way this tool controls it: lighter and grayscale-only pixels require less ink or toner to reproduce than dark, colorful ones. Exact savings depend on your printer." }, { question: "Will very light settings make my document hard to read?", answer: "A high lighten percentage can wash out fine details or thin text. Start around 20-30% and check a test page." }, { question: "Is my file uploaded anywhere?", answer: "No — everything happens entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
