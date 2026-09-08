import type { Metadata } from "next";
import RandomTeamGenerator from "../../../calculators/generators/RandomTeamGenerator";
import tool from "../../../data/tools/generators-random-team-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RandomTeamGenerator />
    </>
  );
}
