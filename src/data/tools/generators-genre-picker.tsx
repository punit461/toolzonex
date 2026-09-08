import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/genre-picker",
    navName: "Genre Picker",
    navDescription: "Randomly pick a movie, music, or book genre.",
    name: "Genre Picker - Random Movie, Music & Book Genre Tool",
    description: "Pick a media type — Movie, Music, or Book — and get a random genre from a curated list, great for when you can't decide what to watch, listen to, or read.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Genre Picker - Random Movie, Music & Book Genre Generator",
    seoDescription: "Free random genre picker for movies, music, and books. Can't decide what to watch, listen to, or read? Get a random genre suggestion instantly.",
    keywords: ["genre picker", "random movie genre generator", "random music genre generator", "random book genre generator", "genre randomizer"],
    ogTitle: "Genre Picker - Random Movie, Music & Book Genre Generator | ToolZoneX",
    ogDescription: "Pick a media type and get a random genre suggestion instantly.",
    schemaName: "Genre Picker",
    schemaDescription: "Pick a media type — Movie, Music, or Book — and get a random genre from a curated list.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool recommend specific movies, songs, or books?", answer: "No — it only picks a genre (like \"Horror\" or \"Jazz\"), not a specific title. You can then use that genre to search your favorite streaming service, library, or bookstore for something to enjoy." }, { question: "Can I get the same genre twice in a row?", answer: "Yes — each pick is fully independent and random, so repeats are possible, just like rolling a die can land on the same number twice." }, { question: "Are the genre lists the same for all three media types?", answer: "No — each media type (Movie, Music, Book) has its own genuinely distinct list of 10 genres tailored to that medium, rather than one shared generic list." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
