import PersonIcon from '@mui/icons-material/Person';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/nickname-shortener",
    navName: "Nickname Shortener",
    navDescription: "Look up common nicknames for a single first name.",
    name: "Nickname Shortener - Common Nickname Lookup",
    description: "Search a common English first name and see its well-known short-form nickname variants, drawn from a built-in lookup table of about 100 names.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PersonIcon fontSize="large" color="primary"/>,
    seoTitle: "Nickname Shortener - Common Nickname Lookup",
    seoDescription: "Free nickname shortener. Search a first name and see its common short-form nickname variants from a built-in lookup table.",
    keywords: ["nickname shortener", "nickname lookup tool", "common nicknames for names", "name to nickname finder", "short form name generator"],
    ogTitle: "Nickname Shortener - Common Nickname Lookup | ToolZoneX",
    ogDescription: "Search a first name to see its common short-form nickname variants.",
    schemaName: "Nickname Shortener",
    schemaDescription: "Search a common English first name and see its well-known short-form nickname variants, drawn from a built-in lookup table of about 100 names.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Nickname Combiner?", answer: "The Nickname Combiner takes TWO different names and blends them together into a new portmanteau \"ship name.\" This Nickname Shortener instead looks up the common short form of a SINGLE name — it doesn't combine or blend anything, it just returns known nicknames for the one name you searched." }, { question: "What if my name isn't in the list?", answer: "The lookup table covers roughly 100 of the most common English first names, so less common or non-English names may not have an entry — in that case, the tool will let you know no match was found." }, { question: "Are these the only nicknames a name can have?", answer: "No — these are simply the most widely recognized common variants. Many names have regional, family-specific, or invented nicknames beyond what any fixed list can cover." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
