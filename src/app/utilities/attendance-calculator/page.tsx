import type { Metadata } from "next";
import AttendanceCalculator from "../../../calculators/utilities/AttendanceCalculator";
import tool from "../../../data/tools/utilities-attendance-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AttendanceCalculator />
    </>
  );
}
