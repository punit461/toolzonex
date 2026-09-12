import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/internet-data-usage-calculator",
    navName: "Internet Data Usage Calculator",
    navDescription: "Estimated data usage from daily activities.",
    name: "Internet Data Usage Calculator",
    description: "Add activities like streaming, video calls, browsing, and gaming with hours per day to estimate total internet data usage per day, week, and month.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <NetworkCheckIcon fontSize="large" color="primary"/>,
    seoTitle: "Internet Data Usage Calculator - Daily, Weekly & Monthly",
    seoDescription: "Free internet data usage calculator. Add your online activities and hours per day to estimate daily, weekly, and monthly data usage.",
    keywords: ["internet data usage calculator", "data usage calculator", "how much data do i use per month", "mobile data usage calculator", "internet plan data calculator"],
    ogTitle: "Internet Data Usage Calculator - Daily, Weekly & Monthly | ToolZoneX",
    ogDescription: "Estimate total internet data usage from your daily online activities.",
    schemaName: "Internet Data Usage Calculator",
    schemaDescription: "Estimate daily, weekly, and monthly internet data usage from activities and hours per day.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How accurate are the preset data rates?", answer: "They're reasonable ballpark averages — actual usage varies by streaming quality settings, video resolution, codec, and platform. For a more precise estimate, check your streaming service or video call app's own data usage settings and enter a custom rate." }, { question: "Does this account for multiple devices or people?", answer: "Add a separate activity row per person or device (or combine hours) to build up a full household estimate — the calculator just sums whatever rows you add, so it scales to as many activities and users as you need." }, { question: "Why does 4K streaming use so much more data than HD?", answer: "4K video has roughly 4x the pixel count of HD, and while compression reduces the gap somewhat, 4K streams still typically use more than twice the data per hour of standard HD streams." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
