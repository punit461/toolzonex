import type { Metadata } from "next";
import PrimeFactorizationCalculator from "../../../calculators/utilities/PrimeFactorizationCalculator";
import tool from "../../../data/tools/utilities-prime-factorization-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PrimeFactorizationCalculator />
    </>
  );
}
