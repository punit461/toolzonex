import type { Metadata } from "next";
import DutyRosterShiftScheduleGenerator from "../../../calculators/generators/DutyRosterShiftScheduleGenerator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/generators/duty-roster-shift-schedule-generator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DutyRosterShiftScheduleGenerator />
    </>
  );
}
