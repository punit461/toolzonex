import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/product-sku-generator",
    navName: "Product SKU Generator",
    navDescription: "Build structured SKU codes from category & attributes.",
    name: "Product SKU Generator",
    description: "Generate structured product SKU codes by combining a category code, attribute codes, and a sequence number with a configurable separator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Product SKU Generator - Build Structured SKU Codes",
    seoDescription: "Free product SKU generator. Combine a category code, attribute codes, and a sequence number into a structured, readable SKU string.",
    keywords: ["product sku generator", "sku generator online", "sku code generator", "product code generator", "inventory sku maker"],
    ogTitle: "Product SKU Generator - Build Structured SKU Codes | ToolZoneX",
    ogDescription: "Combine a category code, attribute codes, and a sequence number into a structured SKU.",
    schemaName: "Product SKU Generator",
    schemaDescription: "Generate structured product SKU codes by combining a category code, attribute codes, and a sequence number with a configurable separator.",
    applicationCategory: "BusinessApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from a random ID generator?", answer: "A random ID generator produces an opaque string with no inherent meaning. This tool instead builds a structured, human-readable code from meaningful components you define — category, attributes, and sequence — so anyone can look at the SKU and understand roughly what it represents." }, { question: "Can I add more than two attribute codes?", answer: "Yes — click \"Add Attribute\" as many times as you need for extra dimensions like material, style, or warehouse location." }, { question: "Does the tool check for duplicate SKUs?", answer: "No — it only formats the SKU string you build from your inputs. You'll still need to check new SKUs against your existing catalog to avoid collisions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
