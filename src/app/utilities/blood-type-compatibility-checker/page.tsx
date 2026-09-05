import type { Metadata } from "next";
import BloodTypeCompatibilityChecker from "../../../calculators/utilities/BloodTypeCompatibilityChecker";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/blood-type-compatibility-checker");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <BloodTypeCompatibilityChecker />
    </>
  );
}
