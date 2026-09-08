import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/code128-barcode-generator",
    navName: "Code128 Barcode Generator",
    navDescription: "Turn text into a scannable Code128 barcode.",
    name: "Code128 Barcode Generator",
    description: "Turn any text into a scannable Code128 barcode and download it as a PNG. Free online Code128 generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <QrCodeScannerIcon fontSize="large" color="primary"/>,
    seoTitle: "Code128 Barcode Generator - Free Online Barcode Maker",
    seoDescription: "Free online Code128 barcode generator. Turn any text — letters, numbers, symbols — into a scannable barcode and download it as a PNG image.",
    keywords: ["code128 barcode generator", "code128 generator", "barcode maker", "generate barcode online", "code 128 barcode"],
    ogTitle: "Code128 Barcode Generator - Free Online Barcode Maker | ToolZoneX",
    ogDescription: "Turn any text into a scannable Code128 barcode and download it as a PNG.",
    schemaName: "Code128 Barcode Generator",
    schemaDescription: "Turn any text into a scannable Code128 barcode and download it as a PNG image.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is Code128 different from EAN-13?", answer: "EAN-13 only encodes 13 numeric digits and is used for retail products. Code128 can encode any ASCII text — letters, numbers, and punctuation — making it far more flexible for logistics and inventory use." }, { question: "Is there a length limit?", answer: "There's no hard limit, but very long text produces a wide, dense barcode that may be harder for some scanners to read reliably — shorter codes scan more consistently." }, { question: "Is my data uploaded anywhere?", answer: "No — the barcode is generated entirely client-side in your browser using the jsbarcode library." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
