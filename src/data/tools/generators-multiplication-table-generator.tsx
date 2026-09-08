import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/multiplication-table-generator",
    navName: "Multiplication Table",
    navDescription: "Printable math tables.",
    name: "Multiplication Table Generator",
    description: "Instantly generate and print custom multiplication times tables for students and teachers.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Multiplication Table Generator - Print Times Tables Online",
    seoDescription: "Instantly generate and print custom multiplication times tables for students and teachers. Free educational math tool.",
    keywords: ["multiplication table", "times table generator", "print times tables", "math tables", "multiplication chart"],
    ogTitle: "Multiplication Table Generator - Print Times Tables Online | ToolZoneX",
    ogDescription: "Instantly generate and print custom multiplication times tables for students and teachers.",
    schemaName: "Multiplication Table Generator",
    schemaDescription: "Instantly generate and print custom multiplication times tables for students and teachers.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
