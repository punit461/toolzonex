import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/attendance-calculator",
    navName: "Attendance Calculator",
    navDescription: "Current attendance % & classes to hit target.",
    name: "Attendance Calculator",
    description: "Calculate your current attendance percentage and how many classes you can miss or must attend to hit a target percentage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Attendance Calculator - Current % & Classes to Reach Target",
    seoDescription: "Free attendance calculator to find your current attendance percentage, plus how many classes you can safely miss or must attend to hit a target like 75%.",
    keywords: ["attendance calculator", "attendance percentage calculator", "how many classes can i miss", "attendance target calculator", "75% attendance calculator", "college attendance calculator"],
    ogTitle: "Attendance Calculator - Current % & Classes to Reach Target | ToolZoneX",
    ogDescription: "Find your current attendance percentage and how many classes you can miss or must attend to hit target.",
    schemaName: "Attendance Calculator",
    schemaDescription: "Calculate current attendance percentage and classes needed to hit a target percentage.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why is 75% attendance so common as a minimum requirement?", answer: "Many universities and boards, especially in India, set 75% as the minimum eligibility to sit for exams, balancing regular classroom participation against reasonable allowance for illness or emergencies. Some institutions or specific courses may set a different threshold, so always confirm your own requirement." }, { question: "Does this account for classes that haven't happened yet?", answer: "The \"classes you can miss\" figure assumes those future classes will happen and you'll skip them, while the \"classes you must attend\" figure assumes you attend every one of them — it can't know your actual future schedule, so treat both as planning estimates." }, { question: "What if my target is 100%?", answer: "At a 100% target, you can never miss a single class and stay on target, and once you've missed even one, that target becomes mathematically unreachable again — a 100% target really only works if attendance has been perfect from day one." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
