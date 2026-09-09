import type { Metadata } from "next";
import FlightTimeCalculator from "../../../calculators/utilities/FlightTimeCalculator";
import tool from "../../../data/tools/utilities-flight-time-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FlightTimeCalculator />
    </>
  );
}
