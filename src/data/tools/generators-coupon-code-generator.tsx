import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/coupon-code-generator",
    navName: "Coupon/Voucher Code Generator",
    navDescription: "Generate readable coupon or voucher codes in bulk.",
    name: "Coupon/Voucher Code Generator - Bulk Discount Codes",
    description: "Generate coupon or voucher codes with an optional prefix, configurable hyphenated groups, and a character set that excludes visually ambiguous characters.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocalOfferIcon fontSize="large" color="primary"/>,
    seoTitle: "Coupon/Voucher Code Generator - Bulk Discount Codes",
    seoDescription: "Free online coupon and voucher code generator. Create readable discount codes in bulk with a custom prefix and ambiguous-character-free format.",
    keywords: ["coupon code generator", "voucher code generator online", "discount code generator", "promo code generator", "bulk coupon code maker"],
    ogTitle: "Coupon/Voucher Code Generator - Bulk Discount Codes | ToolZoneX",
    ogDescription: "Create readable coupon or voucher codes in bulk with a custom prefix and format.",
    schemaName: "Coupon/Voucher Code Generator",
    schemaDescription: "Generate coupon or voucher codes with an optional prefix, configurable hyphenated groups, and a character set that excludes visually ambiguous characters.",
    applicationCategory: "BusinessApplication",
    currency: undefined,
    faqs: [{ question: "Why are certain characters excluded?", answer: "Characters like 0 and O, or 1, I, and L, look nearly identical in many fonts and can cause customers to mistype a code — excluding them keeps every generated code easy to read and enter correctly." }, { question: "Are two generated codes ever the same?", answer: "It's extremely unlikely with a reasonable group length, since each character is drawn using the Web Crypto API's cryptographically secure randomness — but for a production system, still check new codes against ones you've already issued." }, { question: "Can I generate codes without a prefix?", answer: "Yes — leave the prefix field blank and the tool will generate codes made up of just the randomized groups." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
