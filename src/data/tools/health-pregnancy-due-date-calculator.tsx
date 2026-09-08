import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/pregnancy-due-date-calculator",
    navName: "Pregnancy Due Date Calculator",
    navDescription: "Due date from LMP using Naegele's Rule.",
    name: "Pregnancy Due Date Calculator",
    description: "Estimate your pregnancy due date, current gestational week, and trimester from the first day of your last menstrual period using Naegele's Rule.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Pregnancy Due Date Calculator - Naegele's Rule",
    seoDescription: "Free pregnancy due date calculator using Naegele's Rule. Enter your last period date to estimate your due date, gestational week, and trimester.",
    keywords: ["pregnancy due date calculator", "due date calculator", "Naegele's rule calculator", "gestational age calculator", "pregnancy week calculator", "estimated due date from LMP"],
    ogTitle: "Pregnancy Due Date Calculator - Naegele's Rule | ToolZoneX",
    ogDescription: "Estimate your due date, gestational week, and trimester from your last menstrual period.",
    schemaName: "Pregnancy Due Date Calculator",
    schemaDescription: "Estimate pregnancy due date, gestational week, and trimester from the last menstrual period using Naegele's Rule.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is Naegele's Rule?", answer: "Naegele's Rule is a widely used estimate, but only about 5% of babies are born exactly on their due date — most arrive within a couple of weeks before or after. It also assumes a regular 28-day cycle with ovulation on day 14, so it's less accurate for people with longer, shorter, or irregular cycles. This calculator provides an estimate only, is not a substitute for professional medical advice, and should not replace dating confirmed by a doctor or an early ultrasound." }, { question: "What are the three trimesters?", answer: "The 1st trimester spans weeks 1–13, the 2nd trimester spans weeks 14–27, and the 3rd trimester spans week 28 until birth (around week 40)." }, { question: "Why does the calculator use my last period instead of the conception date?", answer: "Conception date is rarely known precisely, but the start of the last period is easier to remember and correlates predictably with typical ovulation timing, which is why Naegele's Rule and most pregnancy wheels are built around LMP rather than the estimated conception date." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
