import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/px-to-rem-converter",
    navName: "PX to REM",
    navDescription: "Convert pixels to REM units.",
    name: "PX to REM Converter",
    description: "Convert Pixels (px) to REM units instantly for responsive CSS web design. Free online calculator.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "PX to REM Converter - Free Online CSS Tool",
    seoDescription: "Convert px to rem instantly for responsive CSS. Includes a 16px to rem reference table (12px, 14px, 16px, 18px, 20px, 24px, 32px, 38px, 120px) plus adjustable base font size.",
    keywords: ["px to rem", "pixels to rem", "css unit converter", "rem calculator", "responsive web design", "px to rem converter", "16px in rem", "120 px to rem", "18px to rem", "12px in rem", "20px in rem", "38px to rem", "24px to rem", "16px to rem", "px to rem calculator"],
    ogTitle: "PX to REM Converter - Free Online CSS Tool | ToolZoneX",
    ogDescription: "Convert Pixels (px) to REM units instantly for responsive CSS web design.",
    schemaName: "PX to REM Converter",
    schemaDescription: "Convert Pixels (px) to REM units instantly for responsive CSS web design.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What is 16px in rem?", answer: "16px equals 1rem, assuming the default 16px root font size — since rem = px ÷ root font size, and 16 ÷ 16 = 1." }, { question: "How do I convert px to rem?", answer: "Divide the pixel value by the root font size (16px by default, unless your project sets a different base). The formula is: rem = px ÷ root font size. For example, 24px ÷ 16px = 1.5rem." }, { question: "What is 120px in rem?", answer: "120px equals 7.5rem at the standard 16px root font size (120 ÷ 16 = 7.5)." }, { question: "What is 18px to rem, and other common sizes?", answer: "At the default 16px root font size: 12px = 0.75rem, 14px = 0.875rem, 16px = 1rem, 18px = 1.125rem, 20px = 1.25rem, 24px = 1.5rem, 32px = 2rem, and 38px = 2.375rem." }, { question: "What if my project's root font size isn't 16px?", answer: "Enter your custom root font size in the base font size slider or field above, and every conversion — including the quick reference table — recalculates using rem = px ÷ your custom base, instead of the default 16px." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
