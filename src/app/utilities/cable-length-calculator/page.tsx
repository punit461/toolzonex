import type { Metadata } from "next";
import CableLengthCalculator from "../../../calculators/utilities/CableLengthCalculator";
import tool from "../../../data/tools/utilities-cable-length-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CableLengthCalculator />
    </>
  );
}
