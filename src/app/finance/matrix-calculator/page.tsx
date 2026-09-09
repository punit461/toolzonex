import type { Metadata } from "next";
import MatrixCalculator from "../../../calculators/finance/MatrixCalculator";
import tool from "../../../data/tools/finance-matrix-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MatrixCalculator />
    </>
  );
}
