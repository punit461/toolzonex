import TerminalIcon from '@mui/icons-material/Terminal';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/curl-command-generator",
    navName: "curl Command Generator",
    navDescription: "Build a properly escaped curl command.",
    name: "curl Command Generator - Build HTTP Requests as curl Commands",
    description: "Build a properly quoted and escaped curl command from a chosen HTTP method, URL, headers, and request body.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TerminalIcon fontSize="large" color="primary"/>,
    seoTitle: "curl Command Generator - Build HTTP Requests as curl Commands",
    seoDescription: "Free curl command generator. Choose an HTTP method, URL, headers, and body to instantly generate a properly escaped curl command.",
    keywords: ["curl command generator", "curl generator", "generate curl command", "curl request builder", "http request to curl"],
    ogTitle: "curl Command Generator - Build HTTP Requests as curl Commands | ToolZoneX",
    ogDescription: "Build a properly quoted and escaped curl command from a method, URL, headers, and body.",
    schemaName: "curl Command Generator",
    schemaDescription: "Build a properly quoted and escaped curl command from a chosen HTTP method, URL, headers, and request body.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: [{ question: "Why are values wrapped in single quotes?", answer: "Single quotes prevent the shell from interpreting special characters like $, backticks, or spaces inside a header value or JSON body. Any single quote inside the value itself is escaped using the '\\'' pattern so the generated command still runs correctly." }, { question: "Why doesn't the body field show up for GET requests?", answer: "GET and DELETE requests conventionally don't carry a request body, so the body field is hidden for methods that don't typically use one and shown only for POST, PUT, and PATCH." }, { question: "Does this send the request anywhere?", answer: "No — this only builds the command text. Nothing is sent over the network; you run the generated command yourself in a terminal when you're ready." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
