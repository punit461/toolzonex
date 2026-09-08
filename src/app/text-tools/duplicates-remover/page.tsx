import type { Metadata } from "next";
import DuplicatesRemover from "../../../calculators/text-tools/DuplicatesRemover";
import tool from "../../../data/tools/text-tools-duplicates-remover";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <DuplicatesRemover />
    </>
  );
}
