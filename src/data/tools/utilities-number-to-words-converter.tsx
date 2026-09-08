import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/number-to-words-converter",
    navName: "Number to Words",
    navDescription: "Convert numbers to English words.",
    name: "Number to Words Converter - Write Numbers in English Words",
    description: "Convert any whole number to English words instantly — see 23,698, 518,500, and 10,795 spelled out. Perfect for writing checks, legal documents, and large numbers.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Number to Words Converter - Write Numbers in English Words",
    seoDescription: "Convert any whole number to English words instantly — see 23,698, 518,500, and 10,795 spelled out. Perfect for writing checks, legal documents, and large numbers.",
    keywords: ["number to words", "numbers to words converter", "how to spell number", "amount in words generator", "check writing number to words", "number to word english", "writing numbers to words", "numbers in words conversion", "numbers in words in english", "write in letters", "numbers to words in english", "spell out numbers", "write number in words", "convert number to words", "23698 in words", "518500 in words", "10795 in words", "367.5 in words", "decimal number to words"],
    ogTitle: "Number to Words Converter - Write Numbers in English Words | ToolZoneX",
    ogDescription: "Convert any whole number to English words instantly — see 23,698, 518,500, and 10,795 spelled out. Perfect for writing checks, legal documents, and large numbers.",
    schemaName: "Number to Words Converter",
    schemaDescription: "Convert any whole number to English words instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I convert a number to words in English?", answer: "Type the number into the input field (digits only, commas are fine) and the English word form appears immediately in the results panel — no button press needed. This works the same whether you think of it as converting a number to words, writing a number in letters, or spelling a number out." }, { question: "What is 23,698 in words?", answer: "23,698 in words is \"twenty-three thousand, six hundred ninety-eight\"." }, { question: "What is 518,500 in words?", answer: "518,500 in words is \"five hundred eighteen thousand, five hundred\"." }, { question: "What is 10,795 in words?", answer: "10,795 in words is \"ten thousand, seven hundred ninety-five\"." }, { question: "Does this tool convert decimal numbers, like 367.5, to words?", answer: "Yes — enter a decimal point and the digits after it are read out individually, the standard way decimals are spoken. 367.5 in words is \"three hundred sixty-seven point five\"." }, { question: "What's the largest number this can convert?", answer: "The converter supports whole numbers up into the trillions (just under 1 quadrillion)." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
