import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/svg-to-react-native",
    navName: "SVG to React Native",
    navDescription: "Convert SVG markup into a react-native-svg component.",
    name: "SVG to React Native SVG Converter",
    description: "Paste raw SVG markup to instantly convert it into a react-native-svg component, with tag names and attributes renamed to their react-native-svg equivalents. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "SVG to React Native Converter - Convert SVG to react-native-svg",
    seoDescription: "Free online SVG to React Native converter. Paste raw SVG markup to instantly generate a react-native-svg component with renamed tags and attributes.",
    keywords: ["svg to react native", "react-native-svg converter", "svg to react native svg", "convert svg for react native", "react native icon component"],
    ogTitle: "SVG to React Native Converter - Convert SVG to react-native-svg | ToolZoneX",
    ogDescription: "Paste SVG markup to instantly generate a react-native-svg component.",
    schemaName: "SVG to React Native SVG Converter",
    schemaDescription: "Paste raw SVG markup to instantly convert it into a react-native-svg component.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Do I need any extra packages to use the output?", answer: "Yes — the generated component imports from react-native-svg, which is not part of core React Native. Install it in your target project with npm install react-native-svg (and run pod install for iOS on bare React Native) before using the generated component." }, { question: "Which tags get renamed?", answer: "Common SVG elements — svg, path, circle, rect, g, line, polygon, polyline, ellipse, defs, linearGradient, radialGradient, stop, text, tspan, clipPath, and mask — are mapped to their react-native-svg component names. The tool also lists exactly which of these your snippet used, so you know what to import." }, { question: "Is my SVG uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
