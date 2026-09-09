import type { Metadata } from "next";
import CircleOfConfusionCalculator from "../../../calculators/utilities/CircleOfConfusionCalculator";
import tool from "../../../data/tools/utilities-circle-of-confusion-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CircleOfConfusionCalculator />
    </>
  );
}
