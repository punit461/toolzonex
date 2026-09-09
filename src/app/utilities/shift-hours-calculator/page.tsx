import type { Metadata } from "next";
import ShiftHoursCalculator from "../../../calculators/utilities/ShiftHoursCalculator";
import tool from "../../../data/tools/utilities-shift-hours-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ShiftHoursCalculator />
    </>
  );
}
