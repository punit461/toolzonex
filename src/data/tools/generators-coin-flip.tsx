import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/coin-flip",
    navName: "Coin Flip",
    navDescription: "Flip a virtual coin.",
    name: "Flip a Coin - Heads or Tails Online",
    description: "Flip a virtual coin instantly online. Free heads or tails random coin flipper for making quick decisions.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Flip a Coin - Heads or Tails Online",
    seoDescription: "Flip a virtual coin instantly online. Free heads or tails random coin flipper for making quick decisions.",
    keywords: ["flip a coin", "heads or tails", "virtual coin flip", "random coin flipper", "online coin toss"],
    ogTitle: "Flip a Coin - Heads or Tails Online | ToolZoneX",
    ogDescription: "Flip a virtual coin instantly online.",
    schemaName: "Flip a Coin",
    schemaDescription: "Flip a virtual coin instantly online.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
