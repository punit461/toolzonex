import type { Metadata } from "next";
import GcdCalculator from "../../../calculators/utilities/GcdCalculator";
import tool from "../../../data/tools/utilities-gcd-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <GcdCalculator />
    </>
  );
}
