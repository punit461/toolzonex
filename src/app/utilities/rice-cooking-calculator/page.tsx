import type { Metadata } from "next";
import RiceCookingCalculator from "../../../calculators/utilities/RiceCookingCalculator";
import tool from "../../../data/tools/utilities-rice-cooking-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RiceCookingCalculator />
    </>
  );
}
