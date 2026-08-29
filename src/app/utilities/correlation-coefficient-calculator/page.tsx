import type { Metadata } from "next";
import CorrelationCoefficientCalculator from "../../../calculators/utilities/CorrelationCoefficientCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/utilities/correlation-coefficient-calculator");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CorrelationCoefficientCalculator />
    </>
  );
}
