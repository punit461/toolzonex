import type { Metadata } from "next";
import MergeTextFiles from "../../../calculators/text-tools/MergeTextFiles";
import tool from "../../../data/tools/text-tools-merge-text-files";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <MergeTextFiles />
    </>
  );
}
