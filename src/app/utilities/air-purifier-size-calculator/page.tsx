import type { Metadata } from "next";
import AirPurifierSizeCalculator from "../../../calculators/utilities/AirPurifierSizeCalculator";
import tool from "../../../data/tools/utilities-air-purifier-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AirPurifierSizeCalculator />
    </>
  );
}
