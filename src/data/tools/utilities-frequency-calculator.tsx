import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/frequency-calculator",
    navName: "Frequency Calculator",
    navDescription: "Convert between period and frequency, or solve wave speed.",
    name: "Frequency Calculator - Period, Frequency & Wave Speed",
    description: "Convert between period and frequency (f = 1/T), plus a wave speed mode relating frequency, wavelength, and propagation speed.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GraphicEqIcon fontSize="large" color="primary"/>,
    seoTitle: "Frequency Calculator - Period to Frequency Converter",
    seoDescription: "Free frequency calculator. Convert period to frequency (and back), or solve for frequency, wavelength, or wave speed given the other two.",
    keywords: ["frequency calculator", "period to frequency calculator", "frequency to period", "wave speed calculator", "f = 1/t calculator"],
    ogTitle: "Frequency Calculator - Period to Frequency Converter | ToolZoneX",
    ogDescription: "Convert between period and frequency, or solve for wave speed, frequency, or wavelength.",
    schemaName: "Frequency Calculator",
    schemaDescription: "Convert between period and frequency, and solve for frequency, wavelength, or wave speed given the other two values.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between period and frequency?", answer: "Period is the time taken for one complete cycle, measured in seconds. Frequency is how many cycles happen per second, measured in Hertz (Hz). They are exact reciprocals: f = 1/T and T = 1/f." }, { question: "How is this different from a wavelength calculator?", answer: "A dedicated wavelength calculator usually fixes the wave speed to a known constant, like the speed of light or the speed of sound. The Wave Speed mode here is fully generic — enter any propagation speed — so it works for water waves, seismic waves, or any custom scenario, not just light or sound." }, { question: "Can frequency or period be negative or zero?", answer: "No — both must be positive numbers greater than zero, since a cycle can't take zero or negative time, and a frequency of zero would mean no oscillation at all." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
