import type { Metadata } from "next";
import CookingTimeCalculator from "../../../calculators/utilities/CookingTimeCalculator";
import tool from "../../../data/tools/utilities-cooking-time-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CookingTimeCalculator />
    </>
  );
}
