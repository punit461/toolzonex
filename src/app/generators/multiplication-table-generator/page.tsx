import type { Metadata } from "next";
import MultiplicationTableGenerator from "../../../calculators/generators/MultiplicationTableGenerator";
import tool from "../../../data/tools/generators-multiplication-table-generator";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <MultiplicationTableGenerator />
    </>
  );
}
