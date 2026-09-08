import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/vehicle-maintenance-fuel-log",
    navName: "Vehicle Maintenance & Fuel Log",
    navDescription: "Log service records and fuel fill-ups with auto price/unit.",
    name: "Vehicle Maintenance & Fuel Log",
    description: "Log maintenance/service records (date, mileage, service, cost, shop) and fuel fill-ups (date, mileage, amount, cost), with price per gallon/liter calculated automatically.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Vehicle Maintenance & Fuel Log - Service History Tracker",
    seoDescription: "Free vehicle maintenance and fuel log. Track service records and fuel fill-ups with automatic price-per-gallon calculation.",
    keywords: ["vehicle maintenance log", "fuel log book", "car service history tracker", "car maintenance tracker", "fuel log generator"],
    ogTitle: "Vehicle Maintenance & Fuel Log - Service History Tracker | ToolZoneX",
    ogDescription: "Track vehicle service records and fuel fill-ups with automatic price-per-unit calculation.",
    schemaName: "Vehicle Maintenance & Fuel Log",
    schemaDescription: "Log maintenance/service records (date, mileage, service, cost, shop) and fuel fill-ups (date, mileage, amount, cost), with price per gallon/liter calculated automatically.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is the price per gallon/liter calculated?", answer: "It divides the total cost you enter by the gallons or liters you enter for that fill-up, updating instantly as you type." }, { question: "Can I track more than one vehicle?", answer: "This tool tracks one log at a time — for multiple vehicles, copy and save each vehicle's log separately before starting a new one." }, { question: "Is my maintenance and fuel data saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the log before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
