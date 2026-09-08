import WifiIcon from '@mui/icons-material/Wifi';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/wifi-network-name-generator",
    navName: "WiFi Network Name Generator",
    navDescription: "Generate punny WiFi network name ideas.",
    name: "WiFi Network Name Generator",
    description: "Generate punny, creative WiFi network name (SSID) suggestions from a hand-picked list of over 60 options.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <WifiIcon fontSize="large" color="primary"/>,
    seoTitle: "WiFi Network Name Generator - Punny SSID Ideas",
    seoDescription: "Free WiFi network name generator. Get punny, creative SSID suggestions from a hand-picked list of over 60 options.",
    keywords: ["wifi name generator", "wifi network name ideas", "funny wifi names", "ssid name generator", "router name generator"],
    ogTitle: "WiFi Network Name Generator - Punny SSID Ideas | ToolZoneX",
    ogDescription: "Get punny, creative WiFi network name suggestions.",
    schemaName: "WiFi Network Name Generator",
    schemaDescription: "Generate punny, creative WiFi network name (SSID) suggestions from a hand-picked list of over 60 options.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Do I need to change any settings to use these?", answer: "No — this tool only generates name ideas. To actually rename your network, log into your router's admin settings (usually through a browser at its local IP address) and update the SSID field there." }, { question: "Will changing my WiFi name disconnect my devices?", answer: "Yes, typically — devices connected to the old network name will need to reconnect to the new name and re-enter the password once you save the change on your router." }, { question: "How many names does this generator draw from?", answer: "Over 60 hand-picked options, with 3 shown at random on each click." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
