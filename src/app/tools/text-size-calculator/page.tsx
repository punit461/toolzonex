import type { Metadata } from "next";
import TextSizeCalculator from "../../../calculators/tools/TextSizeCalculator";
import tool from "../../../data/tools/tools-text-size-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <TextSizeCalculator />
    </>
  );
}
