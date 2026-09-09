import type { Metadata } from "next";
import AccelerationCalculator from "../../../calculators/utilities/AccelerationCalculator";
import tool from "../../../data/tools/utilities-acceleration-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AccelerationCalculator />
    </>
  );
}
