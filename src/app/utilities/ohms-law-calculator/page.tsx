import type { Metadata } from "next";
import OhmsLawCalculator from "../../../calculators/utilities/OhmsLawCalculator";
import tool from "../../../data/tools/utilities-ohms-law-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <OhmsLawCalculator />
    </>
  );
}
