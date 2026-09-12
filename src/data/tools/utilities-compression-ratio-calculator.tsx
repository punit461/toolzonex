import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/compression-ratio-calculator",
    navName: "Compression Ratio Calculator",
    navDescription: "Calculate engine compression ratio.",
    name: "Engine Compression Ratio Calculator",
    description: "Calculate engine displacement and compression ratio per cylinder from bore diameter, stroke length, and combustion chamber volume.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PrecisionManufacturingIcon fontSize="large" color="primary"/>,
    seoTitle: "Compression Ratio Calculator - Engine Compression Ratio",
    seoDescription: "Free engine compression ratio calculator. Enter bore, stroke, and combustion chamber volume to calculate displacement and compression ratio.",
    keywords: ["compression ratio calculator", "engine compression ratio calculator", "cylinder displacement calculator", "bore stroke calculator", "engine cc calculator"],
    ogTitle: "Compression Ratio Calculator - Engine Compression Ratio | ToolZoneX",
    ogDescription: "Calculate engine displacement and compression ratio from bore and stroke.",
    schemaName: "Engine Compression Ratio Calculator",
    schemaDescription: "Calculate engine displacement and compression ratio per cylinder from bore diameter, stroke length, and combustion chamber volume.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What is a typical compression ratio for a road car?", answer: "Most modern naturally aspirated gasoline engines run somewhere around 9:1 to 13:1, while turbocharged/supercharged engines often run lower (around 8:1 to 10:1) to avoid knock under boost. Diesel engines run much higher, typically 14:1 to 23:1, since they rely on compression alone to ignite the fuel." }, { question: "Does this include the head gasket's volume?", answer: "This calculator uses a single combined \"combustion chamber volume\" figure, which in a full engine-building context should include the cylinder head's chamber volume, the head gasket's compressed volume, and any piston dish or dome volume together — measure or sum all of these into the chamber volume field for an accurate result." }, { question: "Why does a higher compression ratio need higher-octane fuel?", answer: "Higher compression raises the temperature and pressure of the air-fuel mixture before ignition, which increases the risk of the fuel igniting prematurely (knock) instead of igniting cleanly from the spark. Higher-octane fuel resists that premature ignition, which is why high-compression engines are usually designed around higher-octane fuel requirements." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
