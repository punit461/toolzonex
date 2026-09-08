import type { Metadata } from "next";
import UnicodeSpaceRemover from "../../../calculators/text-tools/UnicodeSpaceRemover";
import tool from "../../../data/tools/text-tools-unicode-space-remover";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <UnicodeSpaceRemover />
    </>
  );
}
