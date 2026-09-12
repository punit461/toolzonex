import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/csp-generator",
    navName: "CSP Generator",
    navDescription: "Build a Content-Security-Policy header.",
    name: "CSP Generator",
    description: "Build a Content-Security-Policy (CSP) header by picking common directives and allowed sources, with the final header assembled instantly.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "CSP Generator - Content-Security-Policy Header Builder",
    seoDescription: "Build a Content-Security-Policy (CSP) header by picking common directives and allowed sources. Free online CSP header generator.",
    keywords: ["csp generator", "content security policy generator", "csp header builder", "content-security-policy online", "csp directives"],
    ogTitle: "CSP Generator - Content-Security-Policy Header Builder | ToolZoneX",
    ogDescription: "Build a Content-Security-Policy (CSP) header by picking common directives and allowed sources.",
    schemaName: "CSP Generator",
    schemaDescription: "Build a Content-Security-Policy (CSP) header by picking common directives and allowed sources, with the final header assembled instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does 'self' mean?", answer: "It restricts loading to the same origin (scheme, host, and port) as the page itself, which is the most common and safest baseline value for most directives." }, { question: "What happens if I leave a directive blank?", answer: "Blank directives are simply left out of the generated header entirely — the browser then falls back to whatever default-src specifies for that resource type, or allows it if no default is set." }, { question: "Where do I put the generated header?", answer: "Set it as the value of the Content-Security-Policy HTTP response header from your server, or as a <meta http-equiv=\"Content-Security-Policy\"> tag in your page's <head> if you can't control response headers directly." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
