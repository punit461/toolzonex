import type { Metadata } from "next";
import CircleOfConfusionCalculator from "../../../calculators/utilities/CircleOfConfusionCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/circle-of-confusion-calculator");

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
