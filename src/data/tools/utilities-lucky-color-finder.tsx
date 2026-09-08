import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/lucky-color-finder",
    navName: "Lucky Color Finder",
    navDescription: "Find your traditional lucky color by zodiac sign.",
    name: "Lucky Color Finder",
    description: "Select your Western zodiac sign to find its traditionally-associated lucky color, for entertainment purposes only.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Lucky Color Finder - Find Your Zodiac Sign's Lucky Color",
    seoDescription: "Free online lucky color finder. Select your zodiac sign to instantly find its traditionally-associated lucky color, for fun.",
    keywords: ["lucky color finder", "lucky color by zodiac sign", "what is my lucky color", "zodiac sign lucky color", "lucky color astrology"],
    ogTitle: "Lucky Color Finder - Find Your Zodiac Sign's Lucky Color | ToolZoneX",
    ogDescription: "Select your zodiac sign to instantly find its traditionally-associated lucky color.",
    schemaName: "Lucky Color Finder",
    schemaDescription: "Select your Western zodiac sign to find its traditionally-associated lucky color, for entertainment purposes only.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this based on science?", answer: "No — this tool is for entertainment and fun purposes only. There is no scientific basis connecting zodiac signs to colors or luck of any kind; treat the result as a lighthearted novelty, not a factual claim." }, { question: "Is there one official lucky color per sign?", answer: "No — different astrology sources list slightly different colors for the same sign. This tool uses one commonly cited color per sign from popular astrology writing." }, { question: "Can I find my zodiac sign here from my birth date?", answer: "This tool expects you to already know your sign and select it directly; use a dedicated zodiac sign finder tool first if you need to determine your sign from a birth date." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
