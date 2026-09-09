import type { Metadata } from "next";
import MomentumCalculator from "../../../calculators/utilities/MomentumCalculator";
import tool from "../../../data/tools/utilities-momentum-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MomentumCalculator />
    </>
  );
}
