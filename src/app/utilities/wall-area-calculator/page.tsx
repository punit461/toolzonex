import type { Metadata } from "next";
import WallAreaCalculator from "../../../calculators/utilities/WallAreaCalculator";
import tool from "../../../data/tools/utilities-wall-area-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <WallAreaCalculator />
    </>
  );
}
