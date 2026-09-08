import type { Metadata } from "next";
import TorqueCalculator from "../../../calculators/utilities/TorqueCalculator";
import tool from "../../../data/tools/utilities-torque-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TorqueCalculator />
    </>
  );
}
