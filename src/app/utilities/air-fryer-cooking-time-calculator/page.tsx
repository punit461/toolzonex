import type { Metadata } from "next";
import AirFryerCookingTimeCalculator from "../../../calculators/utilities/AirFryerCookingTimeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/air-fryer-cooking-time-calculator");

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
