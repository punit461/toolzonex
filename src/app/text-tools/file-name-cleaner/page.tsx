import type { Metadata } from "next";
import FileNameCleaner from "../../../calculators/text-tools/FileNameCleaner";
import tool from "../../../data/tools/text-tools-file-name-cleaner";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FileNameCleaner />
    </>
  );
}
