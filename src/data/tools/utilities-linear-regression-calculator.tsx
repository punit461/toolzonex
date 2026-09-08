import TimelineIcon from '@mui/icons-material/Timeline';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/linear-regression-calculator",
    navName: "Linear Regression Calculator",
    navDescription: "Slope, intercept & R² from data points.",
    name: "Linear Regression Calculator - Slope, Intercept & R²",
    description: "Calculate the least-squares linear regression line from a list of (x, y) data points, with slope, intercept, and R².",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <TimelineIcon fontSize="large" color="primary"/>,
    seoTitle: "Linear Regression Calculator - Slope, Intercept & R²",
    seoDescription: "Free online linear regression calculator. Enter (x, y) data points to calculate slope, intercept, and R² using the least-squares method.",
    keywords: ["linear regression calculator", "least squares calculator", "slope intercept calculator", "r squared calculator", "best fit line calculator"],
    ogTitle: "Linear Regression Calculator - Slope, Intercept & R² | ToolZoneX",
    ogDescription: "Calculate least-squares linear regression from your data points.",
    schemaName: "Linear Regression Calculator",
    schemaDescription: "Calculate the least-squares linear regression line from (x, y) data points, with slope, intercept, and R².",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does R² actually tell me?", answer: "R² represents the proportion of variation in y that's explained by the linear relationship with x. An R² of 0.998 means about 99.8% of the variation in y is explained by the fitted line, while values closer to 0 mean the linear model explains very little of the pattern in the data." }, { question: "How many data points do I need?", answer: "At least 2 points are needed to define a line mathematically, but 2 points will always produce a perfect R² of 1 regardless of any real relationship. Meaningful regression analysis typically needs several data points to reveal whether a genuine linear trend exists." }, { question: "What if my data isn't actually linear?", answer: "Linear regression will still produce a best-fit straight line and an R² value, but a low R² is a signal that the relationship between x and y may be curved, cyclical, or otherwise non-linear, and a different type of model might describe the data better." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
