import type { Metadata } from "next";
import AcBtuCalculator from "../../../calculators/utilities/AcBtuCalculator";
import tool from "../../../data/tools/utilities-ac-btu-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AcBtuCalculator />
    </>
  );
}
