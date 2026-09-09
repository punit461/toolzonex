import type { Metadata } from "next";
import PercentErrorCalculator from "../../../calculators/utilities/PercentErrorCalculator";
import tool from "../../../data/tools/utilities-percent-error-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PercentErrorCalculator />
    </>
  );
}
