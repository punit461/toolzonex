import type { Metadata } from "next";
import SchoolSupplyChecklist from "../../../calculators/generators/SchoolSupplyChecklist";
import tool from "../../../data/tools/generators-school-supply-checklist";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <SchoolSupplyChecklist />
    </>
  );
}
