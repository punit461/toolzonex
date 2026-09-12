import WifiIcon from '@mui/icons-material/Wifi';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/wifi-password-qr-generator",
    navName: "WiFi QR Code Generator",
    navDescription: "Turn WiFi credentials into a QR code.",
    name: "WiFi Password QR Code Generator",
    description: "Turn your WiFi network name and password into a scannable QR code so guests can join instantly with a phone camera.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <WifiIcon fontSize="large" color="primary"/>,
    seoTitle: "WiFi Password QR Code Generator - Free Online Tool",
    seoDescription: "Turn your WiFi network name and password into a scannable QR code — guests join instantly by scanning with a phone camera. Free online tool.",
    keywords: ["wifi qr code generator", "wifi password qr code", "wifi qr generator", "generate wifi qr code", "qr code for wifi"],
    ogTitle: "WiFi Password QR Code Generator - Free Online Tool | ToolZoneX",
    ogDescription: "Turn your WiFi network name and password into a scannable QR code.",
    schemaName: "WiFi Password QR Code Generator",
    schemaDescription: "Turn your WiFi network name and password into a scannable QR code so guests can join instantly with a phone camera.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Which phones can scan a WiFi QR code?", answer: "Most modern iPhones (iOS 11+) and Android phones (Android 10+) can scan a WiFi QR code directly from the built-in camera app and join the network automatically, without installing a separate scanner app." }, { question: "What encryption type should I choose?", answer: "Choose WPA/WPA2 for almost every modern home or office router — it's the current standard. Only choose WEP if your router specifically uses that older, less secure protocol, and choose \"None\" for an open network with no password." }, { question: "Is my WiFi password uploaded anywhere?", answer: "No — the QR code is generated entirely client-side in your browser. Your network name and password are never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
