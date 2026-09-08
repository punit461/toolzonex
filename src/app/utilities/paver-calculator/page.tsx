import type { Metadata } from "next";
import PaverCalculator from "../../../calculators/utilities/PaverCalculator";
import tool from "../../../data/tools/utilities-paver-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PaverCalculator />
    </>
  );
}
