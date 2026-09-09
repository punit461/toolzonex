import type { Metadata } from "next";
import PlywoodSheetCalculator from "../../../calculators/utilities/PlywoodSheetCalculator";
import tool from "../../../data/tools/utilities-plywood-sheet-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <PlywoodSheetCalculator />
    </>
  );
}
