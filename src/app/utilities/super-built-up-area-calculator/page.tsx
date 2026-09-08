import type { Metadata } from "next";
import SuperBuiltUpAreaCalculator from "../../../calculators/utilities/SuperBuiltUpAreaCalculator";
import tool from "../../../data/tools/utilities-super-built-up-area-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SuperBuiltUpAreaCalculator />
    </>
  );
}
