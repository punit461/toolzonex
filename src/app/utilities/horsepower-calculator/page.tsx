import type { Metadata } from "next";
import HorsepowerCalculator from "../../../calculators/utilities/HorsepowerCalculator";
import tool from "../../../data/tools/utilities-horsepower-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <HorsepowerCalculator />
    </>
  );
}
