import type { Metadata } from "next";
import HikingTimeCalculator from "../../../calculators/utilities/HikingTimeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/hiking-time-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HikingTimeCalculator />
    </>
  );
}
