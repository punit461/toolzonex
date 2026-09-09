import type { Metadata } from "next";
import FileExtensionFinder from "../../../calculators/developer-tools/FileExtensionFinder";
import tool from "../../../data/tools/developer-tools-file-extension-finder";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }} />
      <FileExtensionFinder />
    </>
  );
}
