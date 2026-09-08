import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/digital-sign-pdf",
    navName: "Digital Sign PDF",
    navDescription: "Add a visual signature block with a SHA-256 hash reference.",
    name: "Digital Sign PDF",
    description: "Add a visual \"digitally signed\" block with signer name, reason, date, and a SHA-256 integrity fingerprint. Not a legally-binding PKI signature — see the FAQ. Free, private, browser-based.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Digital Sign PDF - Add a Signature Block Online Free",
    seoDescription: "Free online tool to add a visual digital signature block to a PDF with a SHA-256 integrity hash, entirely in your browser. Not a legally-binding cryptographic signature.",
    keywords: ["digital sign pdf", "digitally sign pdf online", "add signature block to pdf", "pdf sha-256 signature", "sign pdf online free"],
    ogTitle: "Digital Sign PDF Online Free | ToolZoneX",
    ogDescription: "Add a visual \"digitally signed\" block with signer name, reason, date, and a SHA-256 integrity fingerprint.",
    schemaName: "Digital Sign PDF",
    schemaDescription: "Add a visual \"digitally signed\" block with signer name, reason, date, and a SHA-256 integrity fingerprint.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this a legally-binding electronic signature?", answer: "No. It does not meet PAdES, eIDAS, or similar legal digital-signature standards, which require a certificate from a trusted authority. For contracts or anything requiring a legally recognized signature, use a dedicated e-signature service instead." }, { question: "What is the SHA-256 hash for?", answer: "It's a fingerprint of the original file's exact bytes, computed in your browser before signing. Anyone can independently hash the original file and compare it to confirm it matches — but this only proves the file's integrity, not the signer's identity or intent." }, { question: "Can this be forged?", answer: "Yes — because there's no certificate authority validating identity, anyone could type any name into the signer field. Treat this as a visible annotation and integrity marker, not proof of authenticity." }, { question: "Is my file uploaded anywhere?", answer: "No — hashing and signing both happen entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
