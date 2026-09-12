import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/hsts-header-generator",
    navName: "HSTS Header Generator",
    navDescription: "Build a Strict-Transport-Security header.",
    name: "HSTS Header Generator",
    description: "Generate a Strict-Transport-Security (HSTS) header with max-age, includeSubDomains, and preload options.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "HSTS Header Generator - Strict-Transport-Security Builder",
    seoDescription: "Generate a Strict-Transport-Security (HSTS) header with max-age, includeSubDomains, and preload options. Free online HSTS header generator.",
    keywords: ["hsts header generator", "strict-transport-security generator", "hsts preload", "force https header", "hsts max-age"],
    ogTitle: "HSTS Header Generator - Strict-Transport-Security Builder | ToolZoneX",
    ogDescription: "Generate a Strict-Transport-Security (HSTS) header with max-age, includeSubDomains, and preload options.",
    schemaName: "HSTS Header Generator",
    schemaDescription: "Generate a Strict-Transport-Security (HSTS) header with max-age, includeSubDomains, and preload options.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What does HSTS actually protect against?", answer: "It stops browsers from ever making a plain HTTP request to your domain once the header has been seen, closing the window an attacker could otherwise use to intercept an initial unencrypted request and redirect or downgrade it." }, { question: "Is submitting to the preload list reversible?", answer: "Not easily — the list ships baked into browser binaries, so removing a domain can take months to reach users, and it should only be done once your entire site (including every subdomain, if includeSubDomains is set) is fully and permanently HTTPS-ready." }, { question: "What max-age should I start with?", answer: "Many sites start with a shorter value (like a few minutes or hours) to confirm HTTPS is working correctly everywhere, then increase it to a long duration such as one or two years once confident." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
