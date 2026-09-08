import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/typing-speed-test",
    navName: "Typing Speed Test",
    navDescription: "Check WPM typing speed.",
    name: "Typing Speed Test (WPM)",
    description: "Check your typing speed and accuracy in Words Per Minute (WPM). Free online 60-second typing test.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Typing Speed Test (WPM) - Check Your Words Per Minute Online",
    seoDescription: "Check your typing speed and accuracy in Words Per Minute (WPM). Free online 60-second typing test to improve keyboard speed.",
    keywords: ["typing speed test", "wpm test", "words per minute", "keyboard test", "type fast online", "typing accuracy", "measure my typing speed", "find wpm", "check wpm", "measure wpm", "wpm checker"],
    ogTitle: "Typing Speed Test (WPM) - Check Your Words Per Minute Online | ToolZoneX",
    ogDescription: "Check your typing speed and accuracy in Words Per Minute (WPM).",
    schemaName: "Typing Speed Test",
    schemaDescription: "Check your typing speed and accuracy in Words Per Minute (WPM).",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "What's a good typing speed?", answer: "The average typist reaches 40 WPM; professional typists often exceed 65-75 WPM." }, { question: "How do I check my WPM?", answer: "Just start typing the highlighted passage above — the 60-second timer starts on your first keystroke, and your WPM and accuracy update live as you type, so you can check your WPM without clicking anything extra." }, { question: "How can I measure my typing speed accurately?", answer: "Type naturally for the full 60 seconds rather than stopping early — WPM is measured over the whole test window using the standard 5-keystrokes-per-word convention, so a longer, uninterrupted run gives a more accurate reading than a few quick words. Run it a few times and take the average, since typing speed naturally varies test to test." }, { question: "Is there a quick WPM checker I can use right now?", answer: "Yes — this page is a free, instant WPM checker. No sign-up, no download: click into the text box and start typing to find your WPM in under a minute." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
