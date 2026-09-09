import type { Metadata } from "next";
import DecisionListGenerator from "../../../calculators/generators/DecisionListGenerator";
import tool from "../../../data/tools/generators-decision-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DecisionListGenerator />
    </>
  );
}
