import type { Metadata } from "next";
import HexCalculator from "../../../calculators/utilities/HexCalculator";
import tool from "../../../data/tools/utilities-hex-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HexCalculator />
    </>
  );
}
