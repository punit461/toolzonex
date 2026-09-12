import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-to-tailwindcss",
    navName: "CSS to Tailwind CSS",
    navDescription: "Best-effort conversion of CSS into Tailwind classes.",
    name: "CSS to Tailwind CSS Converter",
    description: "Paste CSS to get a best-effort conversion into Tailwind utility classes, with anything that can't be confidently mapped listed separately for manual conversion. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS to Tailwind CSS Converter - Convert CSS to Utility Classes",
    seoDescription: "Free online CSS to Tailwind CSS converter. Paste CSS to get a best-effort conversion into Tailwind utility classes, with unmapped declarations clearly flagged.",
    keywords: ["css to tailwind", "css to tailwind css converter", "convert css to tailwind classes", "css to utility classes", "tailwind class generator"],
    ogTitle: "CSS to Tailwind CSS Converter - Convert CSS to Utility Classes | ToolZoneX",
    ogDescription: "Paste CSS to get a best-effort conversion into Tailwind utility classes.",
    schemaName: "CSS to Tailwind CSS Converter",
    schemaDescription: "Paste CSS to get a best-effort conversion into Tailwind utility classes.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is this conversion?", answer: "This is explicitly a best-effort tool. It only recognizes a common default-theme subset — a standard spacing scale, a small set of named palette colors, and common layout/typography properties — and has no awareness of any custom tailwind.config.js theme extensions your project might use. Arbitrary or complex values (gradients, custom shadows, unusual color values, calc() expressions, and so on) are not guessed; they're listed as unmapped so you can convert them by hand or express them with Tailwind's arbitrary-value syntax, e.g. bg-[#1a2b3c] or p-[18px]." }, { question: "Why are some colors matched to the wrong Tailwind shade?", answer: "Color matching only compares against the \"500\" shade of each named Tailwind color (plus black/white/transparent) using nearest-hex-distance, so an exact match isn't guaranteed — treat the suggested class as a starting point and adjust the shade number to match your design." }, { question: "Is my CSS uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
