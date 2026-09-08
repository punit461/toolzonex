import type { Metadata } from "next";
import DpiCalculator from "../../../calculators/utilities/DpiCalculator";
import tool from "../../../data/tools/utilities-dpi-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DpiCalculator />
    </>
  );
}
