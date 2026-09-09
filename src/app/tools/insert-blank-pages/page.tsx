import type { Metadata } from "next";
import InsertBlankPages from "../../../calculators/pdf/InsertBlankPages";
import tool from "../../../data/tools/tools-insert-blank-pages";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <InsertBlankPages />
    </>
  );
}
