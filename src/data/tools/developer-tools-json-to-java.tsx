import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-java",
    navName: "JSON to Java",
    navDescription: "Generate Java POJO classes from JSON.",
    name: "JSON to Java POJO Converter",
    description: "Paste a JSON sample to instantly generate matching Java classes with private fields, getters, and setters. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Java Converter - Generate POJO Classes Online",
    seoDescription: "Free online JSON to Java converter. Paste any JSON sample to instantly generate matching Java POJO classes with getters, setters, and nested classes.",
    keywords: ["json to java", "json to java pojo", "generate java class from json", "json2java alternative", "java pojo generator"],
    ogTitle: "JSON to Java Converter - Generate POJO Classes Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching Java POJO classes.",
    schemaName: "JSON to Java POJO Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Java classes with private fields, getters, and setters.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why do some fields use boxed types like Integer instead of int?", answer: "Java's primitive types can't represent null. Any field that's missing from at least one sample or was ever null is generated with its boxed equivalent (Integer, Double, Boolean) so the class can actually represent the absence of a value." }, { question: "Does this work with Jackson or Gson out of the box?", answer: "The generated classes follow standard JavaBean conventions (private fields with public getters and setters), which both Jackson and Gson can bind to by default without extra annotations, as long as field names match your JSON keys." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and class generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
