import StorefrontIcon from '@mui/icons-material/Storefront';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/business-directory-generator",
    navName: "Business Directory Generator",
    navDescription: "Categorized Staff, Customer, Supplier & Vendor directory.",
    name: "Business Directory Generator",
    description: "Add directory entries categorized as Staff, Customer, Supplier, or Vendor with company, role, phone, and email, and get an organized, filterable directory.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <StorefrontIcon fontSize="large" color="primary"/>,
    seoTitle: "Business Directory Generator - Staff, Customer & Vendor List",
    seoDescription: "Free business directory generator. Organize Staff, Customer, Supplier, and Vendor contacts with company, role, phone, and email.",
    keywords: ["business directory generator", "staff contact directory", "vendor directory maker", "supplier contact list", "customer list organizer"],
    ogTitle: "Business Directory Generator - Staff, Customer & Vendor List | ToolZoneX",
    ogDescription: "Organize Staff, Customer, Supplier, and Vendor contacts into a filterable directory.",
    schemaName: "Business Directory Generator",
    schemaDescription: "Add directory entries categorized as Staff, Customer, Supplier, or Vendor with company, role, phone, and email, and get an organized, filterable directory.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Contact List Formatter?", answer: "The Contact List Formatter is for a personal contact list of name, phone, email, and address. This tool is for business relationship directories with company, role, and category fields — a different use case suited to staff, customer, supplier, and vendor relationships." }, { question: "Can I filter the directory to show only one category?", answer: "Yes — use the filter toggle above the directory panel to show All entries or just Staff, Customer, Supplier, or Vendor entries." }, { question: "Is my directory saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the directory before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
