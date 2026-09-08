import type { Metadata } from "next";
import CameraMegapixelCalculator from "../../../calculators/utilities/CameraMegapixelCalculator";
import tool from "../../../data/tools/utilities-camera-megapixel-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CameraMegapixelCalculator />
    </>
  );
}
