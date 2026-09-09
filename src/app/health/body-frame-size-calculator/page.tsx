import type { Metadata } from "next";
import BodyFrameSizeCalculator from "../../../calculators/health/BodyFrameSizeCalculator";
import tool from "../../../data/tools/health-body-frame-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <BodyFrameSizeCalculator />
    </>
  );
}
