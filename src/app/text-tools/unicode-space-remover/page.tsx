import type { Metadata } from "next";
import UnicodeSpaceRemover from "../../../calculators/text-tools/UnicodeSpaceRemover";
import { getTool } from "../../../data/toolRegistry";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

const tool = getTool("/text-tools/unicode-space-remover");
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <UnicodeSpaceRemover />
    </>
  );
}
