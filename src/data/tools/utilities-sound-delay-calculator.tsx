import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/sound-delay-calculator",
    navName: "Sound Delay Calculator",
    navDescription: "Delay speaker timing from distance & temperature.",
    name: "Sound Delay Calculator",
    description: "Calculate the time delay to apply to a delay speaker based on its distance from the main sound source and air temperature.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GraphicEqIcon fontSize="large" color="primary"/>,
    seoTitle: "Sound Delay Calculator - Delay Speaker Timing (ms)",
    seoDescription: "Free sound delay calculator for live audio. Enter the distance between your main and delay speakers to calculate the correct time delay in milliseconds.",
    keywords: ["sound delay calculator", "delay speaker calculator", "audio delay calculator", "speed of sound calculator live sound", "live sound delay timing"],
    ogTitle: "Sound Delay Calculator - Delay Speaker Timing (ms) | ToolZoneX",
    ogDescription: "Calculate the correct time delay for a delay speaker based on distance and temperature.",
    schemaName: "Sound Delay Calculator",
    schemaDescription: "Calculate the time delay to apply to a delay speaker based on its distance from the main sound source and air temperature.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does temperature affect the delay time?", answer: "Sound travels faster through warmer air because warmer air molecules move faster and transmit pressure waves more quickly. The difference is small over typical room-temperature ranges, but can matter for precise time-alignment over longer distances or in outdoor venues with big temperature swings." }, { question: "Do I always need to add the extra precedence offset?", answer: "No — some engineers set delay speakers to the exact calculated travel-time delay with no offset, especially for pure intelligibility/fill applications. The extra 10-20ms offset is a common practice for helping the audience perceive the sound as coming from the main stage rather than the nearby delay speaker; feel free to set it to 0 if you prefer an exact time-aligned setup." }, { question: "Does humidity affect the speed of sound too?", answer: "Slightly, but the effect is much smaller than temperature for typical live-sound purposes, so this calculator only adjusts for temperature to keep things simple and practical." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
