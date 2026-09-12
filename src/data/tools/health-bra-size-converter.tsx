import Woman2Icon from '@mui/icons-material/Woman2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/bra-size-converter",
    navName: "Bra Size Converter",
    navDescription: "Convert bra sizes between US, UK, EU & International.",
    name: "Bra Size Converter",
    description: "Convert bra sizes between US, UK, EU, and International band and cup sizing conventions.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <Woman2Icon fontSize="large" color="primary"/>,
    seoTitle: "Bra Size Converter - US, UK, EU & International",
    seoDescription: "Free bra size converter between US, UK, EU, and International sizing. Enter your band and cup size to see it converted across all regions.",
    keywords: ["bra size converter", "bra size chart", "us to eu bra size", "bra size conversion calculator", "international bra size chart"],
    ogTitle: "Bra Size Converter - US, UK, EU & International | ToolZoneX",
    ogDescription: "Convert bra sizes between US, UK, EU, and International sizing instantly.",
    schemaName: "Bra Size Converter",
    schemaDescription: "Convert bra sizes between US, UK, EU, and International band and cup sizing conventions.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Are bra size conversions exact across brands?", answer: "No — bra sizing conventions vary meaningfully between manufacturers and even between styles from the same brand, since there's no single global sizing standard enforced across the industry. This converter applies widely used standard conversion rules as a reliable starting point, but the best way to confirm fit is always to try the garment on or check the specific brand's own size chart." }, { question: "Why do band sizes look so different between US and EU?", answer: "US and UK band sizes are based on an inch measurement (with an offset), while EU and International band sizes are based directly on the underbust measurement in centimeters, which is why the numbers look very different (like 34 vs. 75) even though they describe the same fit." }, { question: "Why does the cup letter change between regions for the same fit?", answer: "Different regions historically developed their own cup-lettering conventions, so the same physical cup volume can carry a different letter depending on the sizing system — EU/International sizing generally runs one cup letter higher than the equivalent US letter." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
