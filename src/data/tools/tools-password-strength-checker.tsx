import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/password-strength-checker",
    navName: "Password Strength",
    navDescription: "Test your password security.",
    name: "Password Strength Checker",
    description: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "Password Strength Checker - Test Your Security",
    seoDescription: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
    keywords: ["password strength checker", "test password security", "secure password analyzer", "is my password strong", "how secure is my password", "password test strength", "password complexity checker", "password security tester"],
    ogTitle: "Password Strength Checker - Test Your Security | ToolZoneX",
    ogDescription: "Check the strength of your password instantly in the browser. Learn how to create secure passwords with our free analyzer.",
    schemaName: "Password Strength Checker",
    schemaDescription: "Check the strength of your password instantly in the browser.",
    applicationCategory: "SecurityApplication",
    currency: "INR",
    faqs: [{ question: "Is my password sent anywhere when I type it?", answer: "No — the analysis runs entirely in your browser using JavaScript, and your password is never transmitted or stored." }, { question: "Is this a real password complexity checker or just a length counter?", answer: "It's a full password complexity checker — it scores length tiers, character variety (uppercase, lowercase, numbers, symbols), and penalizes passwords made of only letters or only numbers, rather than just counting characters." }, { question: "How does this password test strength scoring work?", answer: "Points are added for length milestones (8+, 12+, 16+ characters) and for including uppercase letters, lowercase letters, numbers, and symbols, then reduced for passwords using only one character type. The total maps to a Very Weak, Weak, Good, or Strong rating shown on the meter." }, { question: "Can I trust an online password security tester with my real password?", answer: "This tester never sends your password over the network or saves it anywhere — the entire check runs client-side in your browser's memory and disappears when you leave the page. Still, as a general rule with any online tool, avoid testing a password you're currently using and change it afterward if you do." }, { question: "What makes a password actually strong?", answer: "Length matters more than complexity tricks — a long passphrase of unrelated words is typically stronger and easier to remember than a short password with substituted symbols. Aim for at least 12-16 characters mixing letter case, numbers, and symbols, and avoid reusing the same password across multiple accounts." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
