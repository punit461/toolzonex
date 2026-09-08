import type { Metadata } from "next";
import FovCalculator from "../../../calculators/utilities/FovCalculator";
import tool from "../../../data/tools/utilities-fov-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FovCalculator />
    </>
  );
}
