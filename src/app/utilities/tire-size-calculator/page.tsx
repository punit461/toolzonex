import type { Metadata } from "next";
import TireSizeCalculator from "../../../calculators/utilities/TireSizeCalculator";
import tool from "../../../data/tools/utilities-tire-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TireSizeCalculator />
    </>
  );
}
