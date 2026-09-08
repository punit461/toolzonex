import type { Metadata } from "next";
import BinomialProbabilityCalculator from "../../../calculators/utilities/BinomialProbabilityCalculator";
import tool from "../../../data/tools/utilities-binomial-probability-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BinomialProbabilityCalculator />
    </>
  );
}
