import SendIcon from '@mui/icons-material/Send';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/whatsapp-link-generator",
    navName: "WhatsApp Link Generator",
    navDescription: "Create WhatsApp click-to-chat links.",
    name: "WhatsApp Link Generator",
    description: "Generate WhatsApp click-to-chat links with pre-filled messages. Free WhatsApp link creator tool.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <SendIcon fontSize="large" color="primary"/>,
    seoTitle: "WhatsApp Link Generator - Create Click-to-Chat Links",
    seoDescription: "Generate WhatsApp click-to-chat links with pre-filled messages. Free online WhatsApp link generator tool.",
    keywords: ["WhatsApp link generator", "create WhatsApp links", "click-to-chat", "WhatsApp business", "WhatsApp contact", "WhatsApp message links", "WhatsApp generator", "WhatsApp buttons"],
    ogTitle: "WhatsApp Link Generator - Create Click-to-Chat Links | ToolZoneX",
    ogDescription: "Generate WhatsApp click-to-chat links with pre-filled messages. Free online WhatsApp link generator tool.",
    schemaName: "WhatsApp Link Generator",
    schemaDescription: "Generate WhatsApp click-to-chat links with pre-filled messages. Free online WhatsApp link generator tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
