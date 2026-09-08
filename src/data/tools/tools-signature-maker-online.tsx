import EditIcon from '@mui/icons-material/Edit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/signature-maker-online",
    navName: "Signature Maker Online",
    navDescription: "Draw a digital signature and download as PNG.",
    name: "Signature Maker Online - Create Digital Signature Free",
    description: "Create a digital signature by drawing on a canvas. Download your signature as a transparent PNG image. Free, private, runs entirely in your browser.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <EditIcon fontSize="large" color="primary"/>,
    seoTitle: "Signature Maker Online - Create Digital Signature Free",
    seoDescription: "Create a digital signature online for free. Draw your signature on a canvas and download it as a transparent PNG. No uploads, runs in your browser.",
    keywords: ["signature maker", "digital signature", "create signature online", "e-signature maker"],
    ogTitle: "Signature Maker Online - Create Digital Signature Free | ToolZoneX",
    ogDescription: "Create a digital signature online for free. Draw and download as PNG. No uploads, runs in your browser.",
    schemaName: "Signature Maker Online",
    schemaDescription: "Create a digital signature by drawing on a canvas.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is the signature saved anywhere?", answer: "No — everything happens in your browser. The image is never uploaded." }, { question: "Can I use this on a phone?", answer: "Yes — the canvas supports touch drawing, so you can sign with your finger on any mobile device." }, { question: "What file format is the download?", answer: "PNG with a transparent background, suitable for overlaying on documents." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
