import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/qr-code-scanner",
    navName: "QR Code Scanner",
    navDescription: "Decode QR codes from image or camera.",
    name: "QR Code Scanner - Decode from Image or Camera",
    description: "Decode any QR code by uploading an image or scanning live with your device's camera. Runs entirely in your browser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <QrCodeScannerIcon fontSize="large" color="primary"/>,
    seoTitle: "QR Code Scanner - Decode QR Codes Online Free",
    seoDescription: "Free online QR code scanner. Decode a QR code by uploading an image or scanning live with your camera. Copy the decoded text or open it as a link.",
    keywords: ["qr code scanner", "qr code reader", "decode qr code online", "scan qr code online", "read qr code from image", "qr code decoder"],
    ogTitle: "QR Code Scanner - Decode QR Codes Online Free | ToolZoneX",
    ogDescription: "Decode any QR code by uploading an image or scanning live with your device's camera.",
    schemaName: "QR Code Scanner",
    schemaDescription: "Decode QR codes from an uploaded image or a live camera scan, entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this work with the QR Code Generator on this site?", answer: "Yes — it pairs naturally with our QR Code Generator. Generate a custom QR code there, then use this scanner to verify it decodes correctly before printing or sharing it." }, { question: "What if my browser denies camera access?", answer: "If camera permission is denied or no camera is available, an error message is shown and live scanning won't start — but the \"Upload Image\" mode always works as a fallback, since it only needs a QR code photo or screenshot." }, { question: "Is my camera feed or uploaded image sent anywhere?", answer: "No — both the camera feed and any uploaded image are processed entirely in your browser. Nothing is uploaded to a server, and the camera stream is stopped as soon as a code is found or you click Stop." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
