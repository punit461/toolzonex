import type { Metadata } from "next";
import FindAndReplaceText from "../../../calculators/text-tools/FindAndReplaceText";
import tool from "../../../data/tools/text-tools-find-and-replace-text";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FindAndReplaceText />
    </>
  );
}
