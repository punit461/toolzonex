import type { Metadata } from "next";
import PrimeNumberChecker from "../../../calculators/utilities/PrimeNumberChecker";
import tool from "../../../data/tools/utilities-prime-number-checker";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <PrimeNumberChecker />
    </>
  );
}
