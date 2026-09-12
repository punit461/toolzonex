import DatasetIcon from '@mui/icons-material/Dataset';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/standard-deviation-calculator",
    navName: "Standard Deviation Calculator",
    navDescription: "Population & sample stddev with variance.",
    name: "Standard Deviation Calculator",
    description: "Calculate population and sample standard deviation, variance, and mean from a list of numbers.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DatasetIcon fontSize="large" color="primary"/>,
    seoTitle: "Standard Deviation Calculator - Population & Sample",
    seoDescription: "Free standard deviation calculator for population (÷n) and sample (÷n−1) standard deviation, variance, and mean from a list of comma-separated numbers.",
    keywords: ["standard deviation calculator", "population standard deviation", "sample standard deviation", "std dev calculator", "variance and standard deviation", "sd calculator"],
    ogTitle: "Standard Deviation Calculator - Population & Sample | ToolZoneX",
    ogDescription: "Calculate population and sample standard deviation, variance, and mean from a list of numbers.",
    schemaName: "Standard Deviation Calculator",
    schemaDescription: "Calculate population and sample standard deviation, variance, and mean from a list of numbers.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "When should I use population vs. sample standard deviation?", answer: "Use population standard deviation when your data represents the entire group you care about. Use sample standard deviation when your data is a subset of a larger population — the n−1 correction (Bessel's correction) compensates for the bias inherent in estimating from a sample." }, { question: "What does a high or low standard deviation mean?", answer: "A low standard deviation means data points tend to be close to the mean (consistent). A high standard deviation means data points are spread out over a wider range (variable)." }, { question: "What units is standard deviation in?", answer: "Standard deviation is expressed in the same units as the original data. If your data is in meters, the standard deviation is also in meters." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
