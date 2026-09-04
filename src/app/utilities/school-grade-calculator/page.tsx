import type { Metadata } from "next";
import SchoolGradeCalculator from "../../../calculators/utilities/SchoolGradeCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/school-grade-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SchoolGradeCalculator />
    </>
  );
}
