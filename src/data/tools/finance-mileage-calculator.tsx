import SpeedIcon from '@mui/icons-material/Speed';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/mileage-calculator",
    navName: "Mileage Calculator",
    navDescription: "Fuel efficiency (mpg, km/l, or kWh) & trip cost.",
    name: "Mileage Calculator",
    description: "Calculate fuel efficiency (mpg, km/l, or miles/km per kWh for EVs) from distance traveled and fuel consumed, plus estimated trip cost.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SpeedIcon fontSize="large" color="primary"/>,
    seoTitle: "Mileage Calculator - MPG, km/l & EV Efficiency",
    seoDescription: "Free mileage calculator to work out fuel efficiency in mpg, km/l, or kWh for electric vehicles, plus estimated fuel cost, from distance and fuel used.",
    keywords: ["mileage calculator", "mpg calculator", "fuel efficiency calculator", "km per liter calculator", "EV efficiency calculator", "gas mileage calculator"],
    ogTitle: "Mileage Calculator - MPG, km/l & EV Efficiency | ToolZoneX",
    ogDescription: "Work out fuel efficiency in mpg, km/l, or kWh, plus estimated fuel cost.",
    schemaName: "Mileage Calculator",
    schemaDescription: "Calculate fuel efficiency from distance traveled and fuel consumed, plus estimated cost.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How do I calculate mpg manually?", answer: "Fill the tank, reset the trip odometer, drive normally, then fill up again and note the gallons needed to refill and the miles driven since the reset. Divide miles by gallons — that's your real-world mpg for that tank." }, { question: "How does this work for electric vehicles?", answer: "Select \"kWh (electric)\" as the fuel unit and enter the kWh of battery used for the trip — the calculator then reports miles (or km) per kWh, the EV equivalent of mpg, along with kWh used per 100 miles/km if you want to compare against a vehicle's rated efficiency." }, { question: "Why does my mpg vary between tanks?", answer: "Driving style, terrain, traffic, temperature, tire pressure, and how much city vs. highway driving you did all affect real-world fuel efficiency — it's normal to see it fluctuate somewhat from the manufacturer's rated average." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
