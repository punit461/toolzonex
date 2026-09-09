import type { Metadata } from "next";
import WireSizeCalculator from "../../../calculators/utilities/WireSizeCalculator";
import tool from "../../../data/tools/utilities-wire-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WireSizeCalculator />
    </>
  );
}
