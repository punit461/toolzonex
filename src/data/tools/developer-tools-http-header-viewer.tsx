import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/http-header-viewer",
    navName: "HTTP Header Viewer",
    navDescription: "Parse and explain pasted HTTP response headers.",
    name: "HTTP Header Viewer",
    description: "Paste raw HTTP response headers to parse the status line and headers into a readable table, with plain-English explanations of common headers.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <NetworkCheckIcon fontSize="large" color="primary"/>,
    seoTitle: "HTTP Header Viewer - Parse & Explain HTTP Headers",
    seoDescription: "Free HTTP header viewer. Paste raw HTTP response headers from DevTools, curl, or Postman to parse them into a readable table with explanations.",
    keywords: ["http header viewer", "http headers parser", "http response header checker", "header viewer tool", "parse http headers"],
    ogTitle: "HTTP Header Viewer - Parse & Explain HTTP Headers | ToolZoneX",
    ogDescription: "Parse raw HTTP response headers into a readable table with explanations.",
    schemaName: "HTTP Header Viewer",
    schemaDescription: "Parse pasted raw HTTP response headers into a status line and a readable header table, with explanations of common headers.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why doesn't this tool fetch headers directly from a URL?", answer: "Browsers block cross-origin JavaScript from reading most response headers of arbitrary third-party sites due to CORS restrictions — a live-fetch version would fail for the vast majority of real websites and would be misleading. Instead, this tool works with headers you've already captured from DevTools, curl, or another tool that isn't subject to those browser restrictions." }, { question: "How does the parser split each header line?", answer: "Each line is split on its first colon only — everything before the first colon becomes the header name, and everything after (trimmed) becomes the value. This correctly handles values that themselves contain colons, like Content-Type: text/html; charset=utf-8 or time-formatted values." }, { question: "Which headers get a plain-English explanation?", answer: "A set of about a dozen commonly seen headers — including Content-Type, Cache-Control, Set-Cookie, Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, Access-Control-Allow-Origin, ETag, Content-Encoding, Vary, Location, and Server — show a short note beneath the header name when they appear in your pasted input." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
