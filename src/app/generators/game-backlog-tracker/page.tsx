import type { Metadata } from "next";
import GameBacklogTracker from "../../../calculators/generators/GameBacklogTracker";
import tool from "../../../data/tools/generators-game-backlog-tracker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <GameBacklogTracker />
    </>
  );
}
