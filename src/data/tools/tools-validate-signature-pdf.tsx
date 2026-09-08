import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/validate-signature-pdf",
    navName: "Validate PDF Signature",
    navDescription: "Detect signature fields and metadata in a PDF.",
    name: "Validate PDF Signature",
    description: "Check whether a PDF contains a signature field and read any signer, reason, or date metadata inside it. Detection only, not cryptographic trust validation. Free, private, browser-based.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Validate PDF Signature - Check for Signature Fields Free",
    seoDescription: "Free online tool to check a PDF for signature fields and read signer/reason/date metadata, entirely in your browser. Presence detection only, not cryptographic trust validation.",
    keywords: ["validate pdf signature", "check pdf signature online", "pdf signature detector", "pdf signature field checker", "verify pdf signature free"],
    ogTitle: "Validate PDF Signature Online Free | ToolZoneX",
    ogDescription: "Check whether a PDF contains a signature field and read any signer, reason, or date metadata inside it.",
    schemaName: "Validate PDF Signature",
    schemaDescription: "Check whether a PDF contains a signature field and read any signer, reason, or date metadata inside it.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this verify the signature is valid or trustworthy?", answer: "No. This is presence-and-metadata detection only. Verifying a cryptographic signature means checking the signed hash, validating a certificate chain up to a trusted root, and checking revocation status — none of that is possible in a static, offline browser tool. Use a full PDF reader like Adobe Acrobat for actual trust verification." }, { question: "Why does it say a signature was found but shows no signer name?", answer: "Not every signature dictionary populates the optional Name/Reason/Location fields — some signing tools only embed the cryptographic data itself, with signer identity carried entirely in the certificate rather than as plain metadata." }, { question: "Is my file uploaded anywhere?", answer: "No — everything runs entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
