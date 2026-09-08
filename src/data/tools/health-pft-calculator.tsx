import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/pft-calculator",
    navName: "PFT Calculator",
    navDescription: "Physical Fitness Test grading for Army, NDA & CDS.",
    name: "PFT Calculator — Physical Fitness Test",
    description: "Calculate your Physical Fitness Test (PFT) grade for Indian Army, NDA, CDS and defence recruitment.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsRunIcon fontSize="large" color="primary"/>,
    seoTitle: "PFT Calculator - Physical Fitness Test Assessment",
    seoDescription: "Free PFT calculator to assess your physical fitness levels with multiple parameters. Track your fitness journey with comprehensive fitness test assessments.",
    keywords: ["PFT calculator", "physical fitness test", "fitness assessment", "fitness level", "physical fitness", "fitness tracking", "APFT", "pft score sheet", "pft scoring", "pft score chart", "pft score table"],
    ogTitle: "PFT Calculator - Physical Fitness Test | ToolZoneX",
    ogDescription: "Assess your physical fitness levels with multiple parameters.",
    schemaName: "PFT Calculator",
    schemaDescription: "Assess physical fitness levels with multiple parameters.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Where is the PFT score sheet?", answer: "The Standard Benchmarks table on this page is the PFT score sheet — it lists the Outstanding, Good, and Average cutoffs for the 1.6km run, 2.4km run, push-ups, and sit-ups. Enter your own times and reps in the calculator above to see which band you land in." }, { question: "How does PFT scoring work?", answer: "Each event — run time, push-up count, sit-up count — is scored independently against fixed thresholds (Outstanding, Good, Average, Below Standard). Your overall PFT grade is set by your weakest event, so a strong run time won't offset a Below Standard push-up count." }, { question: "Do all services use the same PFT standards?", answer: "No — exact distances, time limits, and rep counts vary slightly between the Army, Navy, Air Force, NDA, CDS, and state police recruitment boards. Always check the specific notification for your exam." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
