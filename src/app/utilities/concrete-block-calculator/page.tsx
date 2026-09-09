import type { Metadata } from "next";
import ConcreteBlockCalculator from "../../../calculators/utilities/ConcreteBlockCalculator";
import tool from "../../../data/tools/utilities-concrete-block-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ConcreteBlockCalculator />
    </>
  );
}
