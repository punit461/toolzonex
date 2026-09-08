import type { Metadata } from "next";
import CentripetalForceCalculator from "../../../calculators/utilities/CentripetalForceCalculator";
import tool from "../../../data/tools/utilities-centripetal-force-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CentripetalForceCalculator />
    </>
  );
}
