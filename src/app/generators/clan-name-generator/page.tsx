import type { Metadata } from "next";
import ClanNameGenerator from "../../../calculators/generators/ClanNameGenerator";
import tool from "../../../data/tools/generators-clan-name-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ClanNameGenerator />
    </>
  );
}
