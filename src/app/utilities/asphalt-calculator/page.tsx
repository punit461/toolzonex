import type { Metadata } from "next";
import AsphaltCalculator from "../../../calculators/utilities/AsphaltCalculator";
import tool from "../../../data/tools/utilities-asphalt-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AsphaltCalculator />
    </>
  );
}
