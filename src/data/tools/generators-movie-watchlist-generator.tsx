import TheatersIcon from '@mui/icons-material/Theaters';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/movie-watchlist-generator",
    navName: "Movie Watchlist Generator",
    navDescription: "Track movies to watch and rate ones you've seen.",
    name: "Movie Watchlist Generator - Track and Rate Movies",
    description: "Add movies with a Want to Watch or Watched status, rate watched movies 1-5 stars, and see your list organized by status.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TheatersIcon fontSize="large" color="primary"/>,
    seoTitle: "Movie Watchlist Generator - Track and Rate Movies",
    seoDescription: "Free online movie watchlist generator. Track movies as Want to Watch or Watched, rate watched movies, and see your list organized by status.",
    keywords: ["movie watchlist generator", "movies to watch tracker", "movie tracker online", "watchlist maker", "movie rating list tool"],
    ogTitle: "Movie Watchlist Generator - Track and Rate Movies | ToolZoneX",
    ogDescription: "Track movies as Want to Watch or Watched and rate the ones you've seen.",
    schemaName: "Movie Watchlist Generator",
    schemaDescription: "Add movies with a Want to Watch or Watched status, rate watched movies 1-5 stars, and see your list organized by status.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "Why does the star rating only appear for some movies?", answer: "The rating field only shows once a movie's status is set to Watched, since you can't meaningfully rate something you haven't seen yet." }, { question: "Can I move a movie from Want to Watch to Watched?", answer: "Yes — just change its status dropdown to Watched, and a rating field will appear so you can score it before it moves into the Watched section." }, { question: "Is my watchlist saved between visits?", answer: "No — the list is generated fresh in your browser each time and resets on reload, so keep a copy elsewhere if you want it to persist." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
