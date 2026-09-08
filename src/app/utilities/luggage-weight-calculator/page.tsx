import type { Metadata } from "next";
import LuggageWeightCalculator from "../../../calculators/utilities/LuggageWeightCalculator";
import tool from "../../../data/tools/utilities-luggage-weight-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LuggageWeightCalculator />
    </>
  );
}
