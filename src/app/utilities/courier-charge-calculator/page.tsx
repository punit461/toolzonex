import type { Metadata } from "next";
import CourierChargeCalculator from "../../../calculators/utilities/CourierChargeCalculator";
import tool from "../../../data/tools/utilities-courier-charge-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CourierChargeCalculator />
    </>
  );
}
