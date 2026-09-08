import type { Metadata } from "next";
import CurtainSizeCalculator from "../../../calculators/utilities/CurtainSizeCalculator";
import tool from "../../../data/tools/utilities-curtain-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CurtainSizeCalculator />
    </>
  );
}
