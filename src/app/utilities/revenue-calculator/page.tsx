import type { Metadata } from "next";
import RevenueCalculator from "../../../calculators/utilities/RevenueCalculator";
import tool from "../../../data/tools/utilities-revenue-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <RevenueCalculator />
    </>
  );
}
