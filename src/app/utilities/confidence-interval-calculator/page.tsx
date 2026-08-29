import type { Metadata } from "next";
import ConfidenceIntervalCalculator from "../../../calculators/utilities/ConfidenceIntervalCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/confidence-interval-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConfidenceIntervalCalculator />
    </>
  );
}
