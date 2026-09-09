import type { Metadata } from "next";
import GardenPlanner from "../../../calculators/generators/GardenPlanner";
import tool from "../../../data/tools/generators-garden-planner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <GardenPlanner />
    </>
  );
}
