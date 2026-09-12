import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/ean13-barcode-generator",
    navName: "EAN-13 Barcode Generator",
    navDescription: "Generate scannable EAN-13 retail barcodes.",
    name: "EAN-13 Barcode Generator",
    description: "Enter 12 digits and automatically calculate the EAN-13 check digit to generate a scannable retail barcode. Free online EAN-13 generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <QrCodeScannerIcon fontSize="large" color="primary"/>,
    seoTitle: "EAN-13 Barcode Generator - Free Online Retail Barcode Maker",
    seoDescription: "Free online EAN-13 barcode generator. Enter 12 digits, get the check digit calculated automatically, and download a scannable barcode as a PNG.",
    keywords: ["ean13 barcode generator", "ean-13 generator", "retail barcode generator", "ean13 check digit calculator", "barcode maker"],
    ogTitle: "EAN-13 Barcode Generator - Free Online Retail Barcode Maker | ToolZoneX",
    ogDescription: "Enter 12 digits and generate a scannable EAN-13 barcode instantly.",
    schemaName: "EAN-13 Barcode Generator",
    schemaDescription: "Enter 12 digits and automatically calculate the EAN-13 check digit to generate a scannable barcode.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is the EAN-13 check digit calculated?", answer: "Each of the first 12 digits is multiplied by 1 or 3 alternately (odd positions ×1, even positions ×3, counting from the left starting at position 1), the results are summed, and the check digit is whatever number brings that sum up to the next multiple of 10." }, { question: "Can I use any 12 digits?", answer: "Technically yes for generating a valid barcode, but real-world EAN-13 codes are issued by GS1 and include a registered manufacturer prefix — use a real assigned code for actual retail products." }, { question: "Is my data uploaded anywhere?", answer: "No — the barcode is generated entirely client-side in your browser using the jsbarcode library." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
