import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/rgb-color-validator",
    navName: "RGB Color Validator",
    navDescription: "Check whether RGB/RGBA channel values are valid.",
    name: "RGB Color Validator",
    description: "Validate an rgb()/rgba() string or individual R, G, B, A fields, with a specific explanation of which channel is out of range if invalid.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <VerifiedUserIcon fontSize="large" color="primary"/>,
    seoTitle: "RGB Color Validator - Check If RGB/RGBA Values Are Valid",
    seoDescription: "Free online RGB color validator. Check an rgb()/rgba() string or individual R, G, B, A fields for valid ranges.",
    keywords: ["RGB color validator", "validate RGB color", "is this RGB valid", "RGBA validator", "RGB range checker"],
    ogTitle: "RGB Color Validator - Check If RGB/RGBA Values Are Valid | ToolZoneX",
    ogDescription: "Check an rgb()/rgba() string or individual channel values for valid ranges.",
    schemaName: "RGB Color Validator",
    schemaDescription: "Validate an rgb()/rgba() string or individual R, G, B, A fields, with a specific explanation of which channel is out of range if invalid.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Can R, G, or B be decimal numbers?", answer: "No — R, G, and B must be whole integers between 0 and 255. A value like 128.5 is invalid, even though it falls within the numeric range, because RGB channels are always whole numbers." }, { question: "What range is alpha allowed to be in?", answer: "Alpha is a decimal (not a percentage) between 0 (fully transparent) and 1 (fully opaque), inclusive. Values like 0.5 or 1 are valid; a value like 50 or 1.2 is not." }, { question: "Is the alpha channel required?", answer: "No — leaving the alpha field blank (or using a plain rgb() string) validates just the R, G, and B channels, since alpha is optional." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
