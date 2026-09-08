import type { Metadata } from "next";
import FenceMaterialCalculator from "../../../calculators/utilities/FenceMaterialCalculator";
import tool from "../../../data/tools/utilities-fence-material-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FenceMaterialCalculator />
    </>
  );
}
