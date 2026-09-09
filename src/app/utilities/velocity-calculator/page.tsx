import type { Metadata } from "next";
import VelocityCalculator from "../../../calculators/utilities/VelocityCalculator";
import tool from "../../../data/tools/utilities-velocity-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <VelocityCalculator />
    </>
  );
}
