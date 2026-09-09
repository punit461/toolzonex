import type { Metadata } from "next";
import AirFryerCookingTimeCalculator from "../../../calculators/utilities/AirFryerCookingTimeCalculator";
import tool from "../../../data/tools/utilities-air-fryer-cooking-time-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AirFryerCookingTimeCalculator />
    </>
  );
}
