import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/blood-type-compatibility-checker",
    navName: "Blood Type Compatibility Checker",
    navDescription: "Check donor-recipient blood type compatibility.",
    name: "Blood Type Compatibility Checker",
    description: "Check whether a specific donor and recipient blood type combination is compatible using the standard ABO and Rh compatibility rules, or view all compatible donors or recipients for a type.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BloodtypeIcon fontSize="large" color="primary"/>,
    seoTitle: "Blood Type Compatibility Checker - Donor & Recipient Chart",
    seoDescription: "Free online blood type compatibility checker. Check donor-to-recipient compatibility using the standard ABO and Rh blood type rules.",
    keywords: ["blood type compatibility checker", "blood donor compatibility chart", "who can donate to who blood type", "universal donor blood type", "blood type compatibility calculator"],
    ogTitle: "Blood Type Compatibility Checker - Donor & Recipient Chart | ToolZoneX",
    ogDescription: "Check donor-to-recipient blood type compatibility using the standard ABO and Rh rules.",
    schemaName: "Blood Type Compatibility Checker",
    schemaDescription: "Check whether a specific donor and recipient blood type combination is compatible using the standard ABO and Rh compatibility rules.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this a substitute for real medical blood typing?", answer: "No — this tool is for general education only. Any real blood transfusion requires laboratory blood typing and cross-matching performed by qualified medical professionals before it can be considered safe; never use this tool as a substitute for that process." }, { question: "Why is O- called the \"universal donor\"?", answer: "O- red blood cells carry neither A nor B antigens nor the Rh factor, so they're far less likely to trigger an immune reaction in a recipient of any other blood type, making O- compatible with all eight types as a donor." }, { question: "Why is AB+ called the \"universal recipient\"?", answer: "AB+ red blood cells already carry A, B, and Rh antigens, so an AB+ recipient's immune system doesn't react against any of those antigens arriving from a donor, allowing AB+ patients to receive blood from all eight types." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
