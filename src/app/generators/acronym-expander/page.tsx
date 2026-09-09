import type { Metadata } from "next";
import AcronymExpander from "../../../calculators/generators/AcronymExpander";
import tool from "../../../data/tools/generators-acronym-expander";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <AcronymExpander />
    </>
  );
}
