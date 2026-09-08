import type { Metadata } from "next";
import TankFillingTimeCalculator from "../../../calculators/utilities/TankFillingTimeCalculator";
import tool from "../../../data/tools/utilities-tank-filling-time-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TankFillingTimeCalculator />
    </>
  );
}
