import type { Metadata } from "next";
import ExtractNumbers from "../../../calculators/text-tools/ExtractNumbers";
import tool from "../../../data/tools/text-tools-extract-numbers";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <ExtractNumbers />
    </>
  );
}
