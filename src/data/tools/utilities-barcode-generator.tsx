import CropIcon from '@mui/icons-material/Crop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/barcode-generator",
    navName: "Barcode Generator",
    navDescription: "Create 1D barcodes instantly.",
    name: "Barcode Generator",
    description: "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CropIcon fontSize="large" color="primary"/>,
    seoTitle: "Barcode Generator - Create Free 1D Barcodes",
    seoDescription: "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
    keywords: ["barcode generator", "create barcode", "upc generator", "ean generator", "code128 generator"],
    ogTitle: "Barcode Generator - Create Free 1D Barcodes | ToolZoneX",
    ogDescription: "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
    schemaName: "Barcode Generator",
    schemaDescription: "Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
