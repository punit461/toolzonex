import type { Metadata } from "next";
import FantasyNameGenerator from "../../../calculators/generators/FantasyNameGenerator";
import tool from "../../../data/tools/generators-fantasy-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FantasyNameGenerator />
    </>
  );
}
