import type { Metadata } from "next";
import WavelengthCalculator from "../../../calculators/utilities/WavelengthCalculator";
import tool from "../../../data/tools/utilities-wavelength-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WavelengthCalculator />
    </>
  );
}
