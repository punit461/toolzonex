import type { Metadata } from "next";
import Vo2MaxCalculator from "../../../calculators/utilities/Vo2MaxCalculator";
import tool from "../../../data/tools/utilities-vo2-max-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <Vo2MaxCalculator />
    </>
  );
}
