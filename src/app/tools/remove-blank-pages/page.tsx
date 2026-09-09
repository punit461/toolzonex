import type { Metadata } from "next";
import RemoveBlankPages from "../../../calculators/pdf/RemoveBlankPages";
import tool from "../../../data/tools/tools-remove-blank-pages";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <RemoveBlankPages />
    </>
  );
}
