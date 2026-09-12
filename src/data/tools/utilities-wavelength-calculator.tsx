import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wavelength-calculator",
    navName: "Wavelength Calculator",
    navDescription: "Convert between frequency & wavelength.",
    name: "Wavelength Calculator - Frequency to Wavelength",
    description: "Calculate wavelength from frequency (or vice versa) for electromagnetic waves or sound waves.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GraphicEqIcon fontSize="large" color="primary"/>,
    seoTitle: "Wavelength Calculator - Frequency to Wavelength",
    seoDescription: "Free online wavelength calculator. Convert between frequency and wavelength for light, radio, and sound waves instantly.",
    keywords: ["wavelength calculator", "frequency to wavelength calculator", "wavelength formula", "radio wavelength calculator", "sound wavelength calculator"],
    ogTitle: "Wavelength Calculator - Frequency to Wavelength | ToolZoneX",
    ogDescription: "Convert between frequency and wavelength instantly.",
    schemaName: "Wavelength Calculator",
    schemaDescription: "Calculate wavelength from frequency (or vice versa) for electromagnetic or sound waves.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does sound speed matter for the calculation?", answer: "Sound travels at a speed that depends on the medium (air, water, or solids) and temperature, unlike light in a vacuum, which is a universal constant. This calculator uses 343 m/s, the commonly cited speed of sound in dry air at about 20°C — actual results will vary somewhat with temperature and altitude." }, { question: "Does the speed of light change in different materials?", answer: "Yes — light travels slightly slower through materials like glass or water than through a vacuum. This calculator uses the vacuum speed of light, which is the standard reference value for most electromagnetic wavelength calculations, including radio and Wi-Fi frequencies traveling through air." }, { question: "Can I convert wavelength back to frequency?", answer: "Yes — switch the direction toggle to \"Wavelength to Frequency\" and enter a wavelength in meters to get the corresponding frequency in Hz, using the same Speed ÷ Wavelength relationship." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
