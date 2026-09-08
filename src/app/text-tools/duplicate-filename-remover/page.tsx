import type { Metadata } from "next";
import DuplicateFilenameRemover from "../../../calculators/text-tools/DuplicateFilenameRemover";
import tool from "../../../data/tools/text-tools-duplicate-filename-remover";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <DuplicateFilenameRemover />
    </>
  );
}
