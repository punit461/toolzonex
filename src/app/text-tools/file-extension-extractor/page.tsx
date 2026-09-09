import type { Metadata } from "next";
import FileExtensionExtractor from "../../../calculators/text-tools/FileExtensionExtractor";
import tool from "../../../data/tools/text-tools-file-extension-extractor";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <FileExtensionExtractor />
    </>
  );
}
