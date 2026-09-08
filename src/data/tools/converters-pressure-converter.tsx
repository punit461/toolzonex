import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/pressure-converter",
    navName: "Pressure Converter",
    navDescription: "Convert between pressure units.",
    name: "Pressure Converter",
    description: "Convert between pressure units like bar, psi, pascal, and atm. Free online pressure converter with a full unit table.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Pressure Converter - Bar, Psi, Pa, atm, mmHg",
    seoDescription: "Free online pressure converter. Convert instantly between pascal, bar, psi, atmosphere, mmHg, and more pressure units.",
    keywords: ["pressure converter", "bar to psi", "psi to bar", "convert pressure", "pascal to psi", "pressure unit converter"],
    ogTitle: "Pressure Converter - Bar, Psi, Pa | ToolZoneX",
    ogDescription: "Convert between all common pressure units instantly.",
    schemaName: "Pressure Converter",
    schemaDescription: "Convert values between common pressure units.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What are the common pressure units?", answer: "Pascal (Pa) is the SI unit; bar and psi are common in engineering and tire gauges; atm is standard for weather and chemistry; mmHg (torr) is used for blood pressure and vacuum." }, { question: "How do I convert bar to psi?", answer: "1 bar ≈ 14.5038 psi. A 2.5 bar tire pressure is about 36 psi. The converter handles the exact factor behind the scenes." }, { question: "What is the difference between gauge and absolute?", answer: "Absolute pressure includes atmospheric pressure on top of gauge readings. This converter converts absolute values; gauge-to-absolute conversion needs adding or subtracting ~1 atm." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
