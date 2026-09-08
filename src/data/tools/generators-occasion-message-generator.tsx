import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/occasion-message-generator",
    navName: "Occasion Message Generator",
    navDescription: "Generate messages for birthdays, holidays & more.",
    name: "Occasion Message Generator",
    description: "Generate ready-to-use messages for birthdays, holidays, thank-yous, congratulations, invitations, or get-well wishes, with optional name personalization.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CardGiftcardIcon fontSize="large" color="primary"/>,
    seoTitle: "Occasion Message Generator - Birthday, Holiday & More",
    seoDescription: "Free occasion message generator. Get ready-to-use messages for birthdays, holidays, thank-yous, congratulations, invitations, and get-well wishes.",
    keywords: ["occasion message generator", "birthday message generator", "thank you message generator", "congratulations message generator", "holiday greeting generator"],
    ogTitle: "Occasion Message Generator - Birthday, Holiday & More | ToolZoneX",
    ogDescription: "Get ready-to-use messages for any occasion, personalized with a name.",
    schemaName: "Occasion Message Generator",
    schemaDescription: "Generate ready-to-use messages for birthdays, holidays, thank-yous, congratulations, invitations, or get-well wishes, with optional name personalization.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Does this replace five separate message generators?", answer: "Yes — this single tool covers Holiday/Festival greetings, thank-you messages, congratulations messages, and invitation messages, plus birthday and get-well messages, all in one place with an occasion selector." }, { question: "Can I edit the generated message afterward?", answer: "Yes — copy it with the copy icon and edit the text freely before sending. These messages are meant as a strong starting point, not a final, uneditable script." }, { question: "What happens if I leave the name field blank?", answer: "The message automatically adjusts its wording to read naturally without a specific name, rather than leaving an awkward gap or placeholder text." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
