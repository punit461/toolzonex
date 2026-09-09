import type { Metadata } from "next";
import CollegePackingChecklist from "../../../calculators/generators/CollegePackingChecklist";
import tool from "../../../data/tools/generators-college-packing-checklist";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <CollegePackingChecklist />
    </>
  );
}
