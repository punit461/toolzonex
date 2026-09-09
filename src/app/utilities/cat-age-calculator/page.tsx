import type { Metadata } from "next";
import CatAgeCalculator from "../../../calculators/utilities/CatAgeCalculator";
import tool from "../../../data/tools/utilities-cat-age-calculator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CatAgeCalculator />
    </>
  );
}
