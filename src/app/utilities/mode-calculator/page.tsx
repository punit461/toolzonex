import type { Metadata } from "next";
import ModeCalculator from "../../../calculators/utilities/ModeCalculator";
import tool from "../../../data/tools/utilities-mode-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ModeCalculator />
    </>
  );
}
