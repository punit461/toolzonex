import PhoneIcon from '@mui/icons-material/Phone';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/phone-validator",
    navName: "Phone Validator",
    navDescription: "Validate phone numbers with country code.",
    name: "Phone Number Validator",
    description: "Validate phone numbers and check format. Supports multiple countries with instant validation.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PhoneIcon fontSize="large" color="primary"/>,
    seoTitle: "Phone Validator - Validate Phone Numbers",
    seoDescription: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
    keywords: ["phone validator", "validate phone numbers", "phone number format", "country codes", "phone number checker", "international phone validation", "phone format checker", "mobile number validator", "phonevalidator", "cell phone validator", "validate phone number online", "phone number verification tool", "phone number verification tools", "check phone number validity", "validate phone number", "check phone validity", "validator number", "mobile number validation", "telephone number validation", "phone number validity", "validating phone numbers", "check if telephone number is valid", "best phone number validator"],
    ogTitle: "Phone Validator - Validate Phone Numbers | ToolZoneX",
    ogDescription: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
    schemaName: "Phone Validator",
    schemaDescription: "Validate and format phone numbers for multiple countries. Free online phone number validator with country code support.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is this a phone number verification tool?", answer: "It's a validator, not a verification tool in the SMS/OTP sense — it checks that a number is correctly formatted and structurally valid for its country, instantly and for free, using the same logic phone networks use to route calls. It does not confirm the number is currently active or reachable; that requires actually sending it an SMS or call, which real phone number verification tools do but this one intentionally does not (so nothing is sent, logged, or charged)." }, { question: "Does this confirm the number is active or reachable?", answer: "No — this checks formatting and structure only, not whether the number is currently in service. To confirm a number is reachable you'd need to actually send it an SMS or call, which this tool does not do." }, { question: "What makes this a good phone number validator?", answer: "It validates every country and territory in the international numbering plan, runs the check instantly in your browser using libphonenumber-js — the same phone-formatting library Google uses internally — and it's free with no sign-up, rate limit, or data sent to a server. That combination of accuracy, speed, and privacy is what to look for in a phone number validator." }, { question: "Can I use this as a cell phone validator or only for landlines?", answer: "Both. Enter any number and the tool validates it regardless of type, then reports back whether it's a mobile (cell) number, a fixed line, VOIP, toll-free, or premium rate number based on that country's numbering plan — so it works equally well as a cell phone validator or a general telephone number validator." }, { question: "What phone number formats does it accept?", answer: "You can type a local number (e.g. \"9876543210\") with the matching country selected from the dropdown, or an international number starting with \"+\" and the country code (e.g. \"+91 9876543210\") — the \"+\" prefix is recognized automatically regardless of which country is selected." }, { question: "Is my phone number sent to a server or stored anywhere?", answer: "No. Validation runs entirely in your browser using the open-source libphonenumber-js library — the same number-formatting logic Google uses internally. Nothing you type is transmitted, logged, or stored." }, { question: "What do the \"Mobile\", \"Fixed Line\", and \"VOIP\" number types mean?", answer: "The number type is inferred from the numbering plan for that country: Mobile means a cellular number, Fixed Line means a landline, and VOIP/Toll-Free/Premium Rate cover internet-based or special-service numbers. Some countries share overlapping ranges, so this is shown as \"unknown\" when it can't be determined precisely." }, { question: "Why does a number that looks correct show as invalid?", answer: "The most common causes are: the wrong country selected in the dropdown, a missing or extra digit for that country's expected length, or a leading \"0\" that should be dropped when dialing internationally. Try re-entering the number in full international format with a \"+\" instead." }, { question: "Can I validate a number without knowing which country it belongs to?", answer: "Yes — type the number with its \"+\" country code prefix (e.g. \"+44 20 7946 0958\") and the tool will parse and validate it correctly no matter which country is selected in the dropdown." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
