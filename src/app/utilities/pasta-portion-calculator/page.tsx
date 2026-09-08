import type { Metadata } from "next";
import PastaPortionCalculator from "../../../calculators/utilities/PastaPortionCalculator";
import tool from "../../../data/tools/utilities-pasta-portion-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PastaPortionCalculator />
    </>
  );
}
