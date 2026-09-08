import type { Metadata } from "next";
import DrivewayAreaCalculator from "../../../calculators/utilities/DrivewayAreaCalculator";
import tool from "../../../data/tools/utilities-driveway-area-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DrivewayAreaCalculator />
    </>
  );
}
