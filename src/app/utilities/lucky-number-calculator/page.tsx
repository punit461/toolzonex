import type { Metadata } from "next";
import LuckyNumberCalculator from "../../../calculators/utilities/LuckyNumberCalculator";
import tool from "../../../data/tools/utilities-lucky-number-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <LuckyNumberCalculator />
    </>
  );
}
