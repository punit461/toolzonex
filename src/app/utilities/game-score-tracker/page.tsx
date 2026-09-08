import type { Metadata } from "next";
import GameScoreTracker from "../../../calculators/utilities/GameScoreTracker";
import tool from "../../../data/tools/utilities-game-score-tracker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GameScoreTracker />
    </>
  );
}
