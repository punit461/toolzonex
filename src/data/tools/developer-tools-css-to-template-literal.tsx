import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/css-to-template-literal",
    navName: "CSS to Template Literal",
    navDescription: "Convert CSS rules into styled-components templates.",
    name: "CSS to Template Literal Converter",
    description: "Paste CSS to instantly convert each rule into a styled-components or Emotion-style tagged template literal. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "CSS to Template Literal Converter - Convert CSS to styled-components",
    seoDescription: "Free online CSS to template literal converter. Paste CSS to instantly generate styled-components or Emotion tagged template literals.",
    keywords: ["css to template literal", "css to styled components", "convert css to styled components", "css to emotion", "styled components generator"],
    ogTitle: "CSS to Template Literal Converter - Convert CSS to styled-components | ToolZoneX",
    ogDescription: "Paste CSS to instantly generate styled-components template literals.",
    schemaName: "CSS to Template Literal Converter",
    schemaDescription: "Paste CSS to instantly convert each rule into a styled-components tagged template literal.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this work with Emotion's styled too?", answer: "Yes — the generated syntax (styled.div`...`) is identical between styled-components and Emotion's @emotion/styled package, so the output works with either without changes." }, { question: "Why use div as the base element?", answer: "div is a safe, generic default. Swap styled.div for whatever element the original selector actually targeted (styled.button, styled.a, and so on) once you paste the output into your project." }, { question: "Is my CSS uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
