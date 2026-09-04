import type { Metadata } from "next";
import ClassroomCapacityCalculator from "../../../calculators/utilities/ClassroomCapacityCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/classroom-capacity-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ClassroomCapacityCalculator />
    </>
  );
}
