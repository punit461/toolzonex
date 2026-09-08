import type { Metadata } from "next";
import DateCalculator from "../../../calculators/utilities/DateCalculator";
import tool from "../../../data/tools/utilities-date-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DateCalculator />
    </>
  );
}
