import type { Metadata } from "next";
import AttendanceListGenerator from "../../../calculators/generators/AttendanceListGenerator";
import tool from "../../../data/tools/generators-attendance-list-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <AttendanceListGenerator />
    </>
  );
}
