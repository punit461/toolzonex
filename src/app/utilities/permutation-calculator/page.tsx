import type { Metadata } from "next";
import PermutationCalculator from "../../../calculators/utilities/PermutationCalculator";
import tool from "../../../data/tools/utilities-permutation-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PermutationCalculator />
    </>
  );
}
