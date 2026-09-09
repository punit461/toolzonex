import type { Metadata } from "next";
import TeamNameGenerator from "../../../calculators/generators/TeamNameGenerator";
import tool from "../../../data/tools/generators-team-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TeamNameGenerator />
    </>
  );
}
