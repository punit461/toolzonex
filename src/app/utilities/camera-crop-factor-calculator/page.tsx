import type { Metadata } from "next";
import CameraCropFactorCalculator from "../../../calculators/utilities/CameraCropFactorCalculator";
import tool from "../../../data/tools/utilities-camera-crop-factor-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CameraCropFactorCalculator />
    </>
  );
}
