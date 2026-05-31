import type { Metadata } from "next";
import GameScoreTracker from "../../../calculators/GameScoreTracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export const metadata: Metadata = {
  title: "Game Score Tracker - Online Scoreboard & Leaderboard",
  description: "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
  keywords: ["game score tracker", "online scoreboard", "score keeper", "board game tracker", "party game scores"],
  alternates: { canonical: "/utilities/game-score-tracker" },
  openGraph: {
    title: "Game Score Tracker - Online Scoreboard & Leaderboard | ToolZoneX",
    description: "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
    url: `${SITE_URL}/utilities/game-score-tracker`,
    type: "article",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Game Score Tracker",
  "description": "Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard.",
  "url": `${SITE_URL}/utilities/game-score-tracker`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <GameScoreTracker />
    </>
  );
}
