import type { Metadata } from "next";
import ProteinIntakeCalculator from "../../../calculators/health/ProteinIntakeCalculator";
import tool from "../../../data/tools/health-protein-intake-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <ProteinIntakeCalculator />
    </>
  );
}
