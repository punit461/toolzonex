import type { Metadata } from "next";
import ConcreteCalculator from "../../../calculators/finance/ConcreteCalculator";
import tool from "../../../data/tools/finance-concrete-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConcreteCalculator />
    </>
  );
}
