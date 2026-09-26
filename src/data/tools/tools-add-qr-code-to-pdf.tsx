import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/add-qr-code-to-pdf",
    navName: "Add QR Code to PDF",
    navDescription: "Add a scannable QR code to every PDF page.",
    name: "Add QR Code to PDF Online Free",
    description: "Add a QR code image to every page of a PDF. Enter the URL or text and position. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Add QR Code to PDF Online Free",
    seoDescription: "Add a QR code image to every page of a PDF online. Enter the URL or text and position. Free, private, runs in your browser.",
    keywords: ["add qr code to pdf", "pdf qr code", "insert qr code pdf", "qr code on pdf"],
    ogTitle: "Add QR Code to PDF Online Free | ToolZoneX",
    ogDescription: "Add a QR code image to every page of a PDF online. Free, private, runs in your browser.",
    schemaName: "Add Qr Code To Pdf",
    schemaDescription: "Add a QR code image to every page of a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is the same QR code on every page?", answer: "Yes — the content you enter is encoded once and placed at the same spot on each page." }, { question: "Does this use an outside QR service?", answer: "No — the QR image is generated in your browser by the same library as our QR Code Generator." }, { question: "Is my file uploaded anywhere?", answer: "No — both the QR code and the updated PDF are created in your browser. Neither your PDF nor the QR content is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
