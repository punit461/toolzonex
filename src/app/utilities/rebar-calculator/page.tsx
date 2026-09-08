import type { Metadata } from "next";
import RebarCalculator from "../../../calculators/utilities/RebarCalculator";
import tool from "../../../data/tools/utilities-rebar-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RebarCalculator />
    </>
  );
}
