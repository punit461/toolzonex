import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/sign-pdf",
    navName: "Sign PDF",
    navDescription: "Draw or type a signature onto a PDF.",
    name: "Sign PDF",
    description: "Draw or type a signature and place it onto a PDF page, then download the signed file. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "Sign PDF Online Free - Draw or Type a Signature",
    seoDescription: "Free online tool to sign a PDF. Draw your signature or type your name in a cursive font, position it on any page, and download the signed PDF.",
    keywords: ["sign pdf", "sign pdf online", "add signature to pdf", "pdf signature tool", "draw signature pdf"],
    ogTitle: "Sign PDF Online Free | ToolZoneX",
    ogDescription: "Draw or type a signature and place it onto a PDF page.",
    schemaName: "Sign PDF",
    schemaDescription: "Draw or type a signature and place it onto a chosen page and position in a PDF.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this a legally binding digital signature?", answer: "No — this tool visually places a signature image onto the PDF page, similar to signing a printed page and scanning it back in. It does not create a cryptographic digital signature, certificate-based signature, or any tamper-evident seal recognized by e-signature compliance standards (like eIDAS or ESIGN). For legally binding signatures, use a dedicated e-signature service." }, { question: "Can I sign more than one page?", answer: "This tool places one signature on one chosen page per run. To sign additional pages, download the result and run it through the tool again on a different page." }, { question: "Is my file uploaded anywhere?", answer: "No — drawing, positioning, and embedding the signature all happen entirely in your browser; the PDF is never sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
