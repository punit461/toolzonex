import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-encryption-decryption",
    navName: "Text Encryption",
    navDescription: "Encrypt text using Base64/ROT13.",
    name: "Text Encryption & Decryption",
    description: "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal. Free secure online string cipher tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Encryption & Decryption - Base64, ROT13, Hex Online",
    seoDescription: "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal algorithms. Free secure online string cipher tool.",
    keywords: ["text encryption", "base64 encode", "base64 decode", "rot13 cipher", "hex encoder", "online text decoder"],
    ogTitle: "Text Encryption & Decryption - Base64, ROT13, Hex Online | ToolZoneX",
    ogDescription: "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal algorithms. Free secure online string cipher tool.",
    schemaName: "Text Encryption & Decryption",
    schemaDescription: "Encrypt or decrypt text using Base64, ROT13, and Hexadecimal algorithms.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
