import type { Metadata } from "next";
import RealRateOfReturnCalculator from "../../../calculators/finance/RealRateOfReturnCalculator";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/finance/real-rate-of-return-calculator");

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RealRateOfReturnCalculator />
    </>
  );
}
