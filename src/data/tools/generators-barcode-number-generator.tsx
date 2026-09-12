import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/barcode-number-generator",
    navName: "Barcode Number Generator",
    navDescription: "Calculate real UPC-A and EAN-13 barcode check digits.",
    name: "Barcode Number Generator - UPC-A and EAN-13 Check Digits",
    description: "Enter or randomize the data digits for a UPC-A or EAN-13 barcode and get the correct check digit calculated using the real standard algorithm for each format.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <QrCodeScannerIcon fontSize="large" color="primary"/>,
    seoTitle: "Barcode Number Generator - UPC-A and EAN-13 Check Digits",
    seoDescription: "Free online barcode number generator. Calculate the correct UPC-A or EAN-13 check digit and get a complete, valid barcode number.",
    keywords: ["barcode number generator", "upc-a check digit calculator", "ean-13 check digit calculator", "barcode check digit generator", "valid barcode number generator"],
    ogTitle: "Barcode Number Generator - UPC-A and EAN-13 Check Digits | ToolZoneX",
    ogDescription: "Calculate the correct UPC-A or EAN-13 check digit and get a complete, valid barcode number.",
    schemaName: "Barcode Number Generator",
    schemaDescription: "Enter or randomize the data digits for a UPC-A or EAN-13 barcode and get the correct check digit calculated using the real standard algorithm for each format.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this generate a scannable barcode image?", answer: "No — this tool only calculates and displays the numeric code with a correct check digit. If you need an actual scannable barcode image to download, use a dedicated barcode image generator instead." }, { question: "Can I use any random digits for a real product?", answer: "Technically the check digit will always be mathematically valid, but real-world UPC and EAN codes are issued by GS1 with a registered manufacturer prefix — use an officially assigned code for actual retail products." }, { question: "What's the actual difference between the UPC-A and EAN-13 formulas?", answer: "Both sum weighted digits and derive the check digit the same way, but the weight pattern is reversed between them: UPC-A applies the ×3 weight to odd positions, while EAN-13 applies it to even positions, which is a direct consequence of EAN-13 having one extra leading digit compared to UPC-A." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
