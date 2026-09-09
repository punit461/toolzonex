import type { Metadata } from "next";
import LawnAreaCalculator from "../../../calculators/utilities/LawnAreaCalculator";
import tool from "../../../data/tools/utilities-lawn-area-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LawnAreaCalculator />
    </>
  );
}
