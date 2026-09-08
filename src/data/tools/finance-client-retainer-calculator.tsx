import HandshakeIcon from '@mui/icons-material/Handshake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/client-retainer-calculator",
    navName: "Client Retainer Calculator",
    navDescription: "Retainer billing with overage hours.",
    name: "Client Retainer Calculator",
    description: "Calculate total billed amount and effective hourly rate for a client retainer, including overage charges when actual hours exceed the included amount.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HandshakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Client Retainer Calculator - Retainer Billing With Overage",
    seoDescription: "Free client retainer calculator. Enter retainer fee, included hours, overage rate, and actual hours to calculate total billed and effective hourly rate.",
    keywords: ["client retainer calculator", "retainer billing calculator", "retainer overage calculator", "monthly retainer calculator", "agency retainer calculator"],
    ogTitle: "Client Retainer Calculator - Retainer Billing With Overage | ToolZoneX",
    ogDescription: "Calculate total billed amount and effective hourly rate for a client retainer with overage hours.",
    schemaName: "Client Retainer Calculator",
    schemaDescription: "Calculate total billed amount for a retainer, adding overage charges for hours beyond the included amount, and the effective hourly rate for the period.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What happens if actual hours are less than the included hours?", answer: "You still bill the full flat retainer fee — retainer arrangements typically don't refund or discount unused hours, since the fee is meant to secure ongoing availability and priority, not just pay for hours used." }, { question: "Why does the effective hourly rate matter?", answer: "It shows what you're really earning per hour once actual usage is factored in. A retainer that looks generous on paper can have a low effective rate if actual hours used are consistently much higher than the included amount without matching overage charges." }, { question: "Should overage hours be billed at a higher rate than the retainer's implied hourly rate?", answer: "Many freelancers and agencies do set overage rates higher than the retainer's baseline rate, since overage work is less predictable and harder to plan around than the committed retainer hours." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
