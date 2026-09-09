import type { Metadata } from "next";
import StairStringerCalculator from "../../../calculators/utilities/StairStringerCalculator";
import tool from "../../../data/tools/utilities-stair-stringer-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <StairStringerCalculator />
    </>
  );
}
