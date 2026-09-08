import type { Metadata } from "next";
import GravelCalculator from "../../../calculators/utilities/GravelCalculator";
import tool from "../../../data/tools/utilities-gravel-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GravelCalculator />
    </>
  );
}
