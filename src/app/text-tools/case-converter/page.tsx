import type { Metadata } from "next";
import CaseConverter from "../../../calculators/text-tools/CaseConverter";
import tool from "../../../data/tools/text-tools-case-converter";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <CaseConverter />
    </>
  );
}
